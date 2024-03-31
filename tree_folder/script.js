const folderStructure = {
  name: "Root",
  type: "folder",
  children: [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 3.txt", type: "file" }],
    },
  ],
};

// เพิ่มโฟลเดอร์ใหม่
function addFolder() {
  const folderNameInput = document.getElementById("folderNameInput");
  const folderName = folderNameInput.value.trim();
  if (folderName !== "") {
    const newFolder = {
      name: folderName,
      type: "folder",
      children: [],
    };
    const folderTree = document.getElementById("folderTree");
    const selectedFolder = folderTree.querySelector(".selected");
    const targetFolder = selectedFolder || folderTree; 
    const treeElement = createTreeElement(newFolder);
    targetFolder.appendChild(treeElement);
    folderNameInput.value = ""; 
  } else {
    alert("Please enter a folder name.");
  }
}

// สร้างโครงสร้างที่สามารถคลิกเพื่อเลือกโฟลเดอร์หรือไฟล์ได้
function createTreeElement(item) {
  const element = document.createElement("div");
  element.textContent = item.name;
  element.classList.add(item.type);
  if (item.type === "folder" && item.children) {
    element.addEventListener("click", function () {
      const previouslySelected = document.querySelector(".selected");
      if (previouslySelected) {
        previouslySelected.classList.remove("selected");
      }
      element.classList.add("selected");
    });
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      element.appendChild(childElement);
    });
  }
  return element;
}

// เพิ่มไฟล์ใหม่
function addFile() {
  const fileNameInput = document.getElementById("fileNameInput");
  const fileName = fileNameInput.value.trim();
  if (fileName !== "") {
    const folderTree = document.getElementById("folderTree");
    const selectedFolder = folderTree.querySelector(".selected");

    if (selectedFolder) {
      const newFile = {
        name: fileName,
        type: "file",
      };
      const treeElement = createTreeElement(newFile);
      selectedFolder.appendChild(treeElement); 
      fileNameInput.value = ""; 
    } else {
      alert("Please select a folder to add the file to."); 
    }
  } else {
    alert("Please enter a file name."); 
  }
}

// ลบไฟล์หรือโฟลเดอร์ที่ถูกเลือก
let lastClickedItem = null;

function deleteItem(event) {
  const clickedItem = event.target;
  
  if (lastClickedItem === clickedItem) {
    if (clickedItem.classList.contains("file") || clickedItem.classList.contains("folder")) {
      const parentItem = clickedItem.parentNode;
      parentItem.removeChild(clickedItem);
      lastClickedItem = null;
    } else {
      alert("Please select an item to delete.");
    }
  } else {
    lastClickedItem = clickedItem;
  }
}

// สร้างโครงสร้างต้นไม้เริ่มต้น
const folderTree = document.getElementById("folderTree");
const treeElement = createTreeElement(folderStructure);
folderTree.appendChild(treeElement);

// เพิ่มการทำงานเมื่อคลิกปุ่ม "Add Folder"
const addFolderBtn = document.getElementById("addFolderBtn");
addFolderBtn.addEventListener("click", addFolder);

// เพิ่มการทำงานเมื่อคลิกปุ่ม "Add File"
const addFileBtn = document.getElementById("addFileBtn");
addFileBtn.addEventListener("click", addFile);

