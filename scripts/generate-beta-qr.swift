// Run from the landing repository: swift scripts/generate-beta-qr.swift
// Uses macOS frameworks only; the URL comes from the same source as the CTAs.
import CoreImage
import Foundation
import ImageIO
import UniformTypeIdentifiers
import Vision

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let source = try String(contentsOf: root.appendingPathComponent("src/lib/site-links.ts"), encoding: .utf8)
let pattern = try NSRegularExpression(pattern: #"export const TESTFLIGHT_BETA_URL = "([^"]+)";"#)
guard let match = pattern.firstMatch(in: source, range: NSRange(source.startIndex..., in: source)),
      let range = Range(match.range(at: 1), in: source) else { fatalError("Missing beta URL") }
let invite = String(source[range])
guard URL(string: invite)?.host == "testflight.apple.com" else { fatalError("Expected a TestFlight invitation") }

let filter = CIFilter(name: "CIQRCodeGenerator")!
filter.setValue(Data(invite.utf8), forKey: "inputMessage")
filter.setValue("M", forKey: "inputCorrectionLevel")
let image = filter.outputImage!
let size = Int(image.extent.width)
let context = CIContext()
let raw = context.createCGImage(image, from: image.extent)!
let gray = CGContext(data: nil, width: size, height: size, bitsPerComponent: 8,
    bytesPerRow: size, space: CGColorSpaceCreateDeviceGray(), bitmapInfo: CGImageAlphaInfo.none.rawValue)!
gray.draw(raw, in: CGRect(x: 0, y: 0, width: size, height: size))
let modules = gray.data!.assumingMemoryBound(to: UInt8.self)
let border = 4 // Additional quiet zone, never crop this from either asset.
let total = size + border * 2
var path = ""
for y in 0..<size {
    for x in 0..<size where modules[y * size + x] < 128 {
        path += "M\(x + border) \(y + border)h1v1h-1z"
    }
}
let svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 \(total) \(total)" width="\(total * 16)" height="\(total * 16)" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="\(path)" fill="#000"/></svg>
"""
let output = root.appendingPathComponent("public/images/beta", isDirectory: true)
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
try svg.write(to: output.appendingPathComponent("gatherory-testflight-qr.svg"), atomically: true, encoding: .utf8)

// Generate the PNG from the same module rows as the SVG, without interpolation.
let scale = 16
let side = total * scale
let png = CGContext(data: nil, width: side, height: side, bitsPerComponent: 8,
    bytesPerRow: side, space: CGColorSpaceCreateDeviceGray(), bitmapInfo: CGImageAlphaInfo.none.rawValue)!
png.setFillColor(gray: 1, alpha: 1)
png.fill(CGRect(x: 0, y: 0, width: side, height: side))
png.setFillColor(gray: 0, alpha: 1)
for y in 0..<size {
    for x in 0..<size where modules[y * size + x] < 128 {
        png.fill(CGRect(x: (x + border) * scale, y: (total - y - border - 1) * scale, width: scale, height: scale))
    }
}
let pngImage = png.makeImage()!
let pngURL = output.appendingPathComponent("gatherory-testflight-qr.png")
let destination = CGImageDestinationCreateWithURL(pngURL as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(destination, pngImage, nil)
guard CGImageDestinationFinalize(destination) else { fatalError("Could not save QR image") }
let request = VNDetectBarcodesRequest()
request.symbologies = [.qr]
try VNImageRequestHandler(cgImage: pngImage).perform([request])
guard request.results?.contains(where: { $0.payloadStringValue == invite }) == true else {
    fatalError("QR did not decode to the beta invitation")
}
print("Generated SVG and \(side)×\(side) PNG; verified decoded invitation: \(invite)")
