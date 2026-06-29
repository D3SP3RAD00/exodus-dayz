export type DayZProjectFileType =
  | "types.xml"
  | "spawnabletypes.xml"
  | "events.xml"
  | "cfgeventspawns.xml"
  | "globals.xml"
  | "economy.xml"
  | "messages.xml"
  | "unknown";

export function detectDayZProjectFile(fileName: string): {
  type: DayZProjectFileType;
  label: string;
  description: string;
} {
  const normalized = fileName.toLowerCase();

  if (normalized === "types.xml") {
    return {
      type: "types.xml",
      label: "Loot Economy",
      description: "Controls item spawn values, lifetime, restock, usage, and tiers.",
    };
  }

  if (normalized === "spawnabletypes.xml") {
    return {
      type: "spawnabletypes.xml",
      label: "Spawnable Loadouts",
      description: "Controls attachments, cargo, and item loadout combinations.",
    };
  }

  if (normalized === "events.xml") {
    return {
      type: "events.xml",
      label: "Dynamic Events",
      description: "Controls event definitions such as vehicles, infected, crashes, and convoys.",
    };
  }

  if (normalized === "cfgeventspawns.xml") {
    return {
      type: "cfgeventspawns.xml",
      label: "Event Spawn Points",
      description: "Controls where dynamic events can appear on the map.",
    };
  }

  if (normalized === "globals.xml") {
    return {
      type: "globals.xml",
      label: "Global Economy Settings",
      description: "Controls global Central Economy behavior.",
    };
  }

  if (normalized === "economy.xml") {
    return {
      type: "economy.xml",
      label: "Economy Loader",
      description: "Defines which economy files are loaded by the mission.",
    };
  }

  if (normalized === "messages.xml") {
    return {
      type: "messages.xml",
      label: "Server Messages",
      description: "Controls automated server messages.",
    };
  }

  return {
    type: "unknown",
    label: "Unknown File",
    description: "Not recognized as a supported DayZ mission file yet.",
  };
}