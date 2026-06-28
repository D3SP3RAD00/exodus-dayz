import { TypeItem } from "../parser/typesParser";

export function exportTypesXml(
  originalXml: string,
  items: TypeItem[],
  fileName: string
) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(originalXml, "application/xml");

  for (const item of items) {
    const type = Array.from(xml.getElementsByTagName("type")).find(
      (node) => node.getAttribute("name") === item.name
    );

    if (!type) continue;

    const setText = (
      tag: "nominal" | "min" | "lifetime" | "restock",
      value: string
    ) => {
      const node = type.getElementsByTagName(tag)[0];
      if (node) node.textContent = value;
    };

    setText("nominal", item.nominal);
    setText("min", item.min);
    setText("lifetime", item.lifetime);
    setText("restock", item.restock);

    const category = type.getElementsByTagName("category")[0];
    if (category) category.setAttribute("name", item.category);

    const usage = type.getElementsByTagName("usage")[0];
    if (usage) usage.setAttribute("name", item.usage);

    const value = type.getElementsByTagName("value")[0];
    if (value) value.setAttribute("name", item.value);
  }

  const output = new XMLSerializer().serializeToString(xml);

  const blob = new Blob([output], {
    type: "application/xml",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName.replace(".xml", "-edited.xml");
  link.click();

  URL.revokeObjectURL(url);
}