export type TypeItem = {
  name: string;
  nominal: string;
  min: string;
  lifetime: string;
  restock: string;
  category: string;
  usage: string;
  value: string;
};

export type LoadedFile = {
  fileName: string;
  xmlText: string;
  rootNode: string;
  valid: boolean;
  error?: string;
};

export function parseTypesXml(
  xmlText: string,
  fileName: string
): {
  loaded: LoadedFile;
  items: TypeItem[];
} {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");
  const error = xml.querySelector("parsererror");

  if (error) {
    return {
      loaded: {
        fileName,
        xmlText,
        rootNode: "Unknown",
        valid: false,
        error: "XML syntax error detected.",
      },
      items: [],
    };
  }

  const rootNode = xml.documentElement.nodeName;

  const items = Array.from(xml.getElementsByTagName("type")).map((type) => ({
    name: type.getAttribute("name") || "UNKNOWN",
    nominal: type.getElementsByTagName("nominal")[0]?.textContent || "",
    min: type.getElementsByTagName("min")[0]?.textContent || "",
    lifetime: type.getElementsByTagName("lifetime")[0]?.textContent || "",
    restock: type.getElementsByTagName("restock")[0]?.textContent || "",
    category:
      type.getElementsByTagName("category")[0]?.getAttribute("name") || "",
    usage: type.getElementsByTagName("usage")[0]?.getAttribute("name") || "",
    value: type.getElementsByTagName("value")[0]?.getAttribute("name") || "",
  }));

  return {
    loaded: {
      fileName,
      xmlText,
      rootNode,
      valid: true,
    },
    items,
  };
}