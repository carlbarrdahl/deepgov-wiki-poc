module.exports = {
  computedFields: [addTitle, addReferences], // Array of functions to computed fields
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

function addReferences(fileInfo, ast) {
  // Initialize an array to store references
  const references = new Set();

  // Function to recursively search for citation nodes
  function findCitations(node) {
    if (node.type === "text" && node.value) {
      // Look for citation patterns like [@citation_key]
      const citationRegex = /\[@([^\]]+)\]/g;
      let match;
      while ((match = citationRegex.exec(node.value)) !== null) {
        references.add(match[1]);
      }
    }

    // Recursively search through children
    if (node.children) {
      node.children.forEach(findCitations);
    }
  }

  // Start the search from the root node
  findCitations(ast);

  // Add the references to the fileInfo
  fileInfo.references = Array.from(references);
}
