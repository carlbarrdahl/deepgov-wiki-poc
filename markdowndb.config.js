module.exports = {
  computedFields: [addTitle], // Array of functions to computed fields
  schemas: {
    // Add zod schemas
  },
  include: [], // Pattern for files to be included
  exclude: [], // Patten for files to be excluded
};

function addTitle(fileInfo, ast) {
  // Find the first header node in the AST
  const headerNode = ast.children.find((node) => node.type === "heading");

  // Extract the text content from the header node
  const title = headerNode
    ? headerNode.children.map((child) => child.value).join("")
    : "";

  // Add the title property to the fileInfo
  fileInfo.title = title;
}
