export type DetectedDayZFile =
  | "types.xml"
  | "spawnabletypes.xml"
  | "events.xml"
  | "globals.xml"
  | "economy.xml"
  | "messages.xml"
  | "cfgeventspawns.xml"
  | "unknown";

export type DetectionResult = {
  type: DetectedDayZFile;
  confidence: number;
  reason: string[];
};

export function detectDayZXml(xml: string): DetectionResult {
  const text = xml.toLowerCase();

  const reason: string[] = [];

  // TYPES.XML

  if (
    text.includes("<types>") &&
    text.includes("<nominal>") &&
    text.includes("<lifetime>")
  ) {
    reason.push("Found <types>");
    reason.push("Found <nominal>");
    reason.push("Found <lifetime>");

    return {
      type: "types.xml",
      confidence: 100,
      reason,
    };
  }

  // SPAWNABLETYPES

  if (
    text.includes("<attachments>") ||
    text.includes("<cargo>")
  ) {
    reason.push("Found attachment/cargo nodes");

    return {
      type: "spawnabletypes.xml",
      confidence: 99,
      reason,
    };
  }

  // EVENTS

  if (
    text.includes("<event name=") &&
    text.includes("<nominal>")
  ) {
    reason.push("Found event definitions");

    return {
      type: "events.xml",
      confidence: 100,
      reason,
    };
  }

  // GLOBALS

  if (
    text.includes("<var name=")
  ) {
    reason.push("Found global variables");

    return {
      type: "globals.xml",
      confidence: 100,
      reason,
    };
  }

  // ECONOMY

  if (
    text.includes("<economycore")
  ) {
    reason.push("Found economycore");

    return {
      type: "economy.xml",
      confidence: 100,
      reason,
    };
  }

  // SERVER MESSAGES

  if (
    text.includes("<message")
  ) {
    reason.push("Found server messages");

    return {
      type: "messages.xml",
      confidence: 95,
      reason,
    };
  }

  return {
    type: "unknown",
    confidence: 0,
    reason: ["Unknown XML structure"],
  };
}