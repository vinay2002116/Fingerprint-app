import type { NextApiRequest, NextApiResponse } from 'next';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fpPromise = FingerprintJS.load();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fp = await fpPromise;
  const result = await fp.get();
  const visitorId = result.visitorId;

  // Log the visitorId or use it for further checks
  console.log(visitorId);

  console.log(req.headers['user-agent']);

  // Example check: Block if visitorId matches known scraper fingerprints
  if (isKnownScraper(visitorId)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.status(200).json({ visitorId });
}

function isKnownScraper(fingerprint: string): boolean {
  // Implement your logic to check against a list of known scraper fingerprints
  const knownScrapers = ['known_scraper_id1', 'known_scraper_id2'];
  return knownScrapers.includes(fingerprint);
}