import { useEffect, useState } from "react";

export default function Home() {
  const [visitorId, setVisitorId] = useState("");

  useEffect(() => {
    async function fetchFingerprint() {
      const res = await fetch("/api/fingerprint");
      if (res.ok) {
        const data = await res.json();
        setVisitorId(data.visitorId);
      } else {
        console.error("Failed to fetch visitor ID");
        setVisitorId("Blocked");
      }
    }

    fetchFingerprint();
  }, []);

  return (
    <div>
      <h1>Fingerprint Test</h1>
      <p>Visitor ID: {visitorId}</p>
    </div>
  );
}
