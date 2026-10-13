/** Confirmed by the operator. Do not publish a guessed address or inactive
 * mailbox. Keep the documents in review until the EU release checks are done:
 * consent controls, transfer safeguards, retention, and required trader/EEA
 * representative disclosures. A free service is not automatically exempt. */
export const LEGAL_DETAILS = {
  operator: "Guide Systems LLC",
  country: "United States",
  contactEmail: "legal@gatherory.com",
  updated: "October 13, 2026",
  releaseReview: true,
} as const;
