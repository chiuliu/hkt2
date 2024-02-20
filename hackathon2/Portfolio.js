const form = document.querySelector("#form-input");
// const idProject = document.querySelector("#id-project");
const nameProject = document.querySelector("#name-project");
const imageProject = document.querySelector("#image-project");
const linkProject = document.querySelector("#link-project");
const tagProject = document.querySelector("#tag-project");
const tbodyTable = document.querySelector("#tbody-table");
const btnSubmit = document.querySelector("#btn-submit");
let existingIndex = -1;
let existing = false;

// Đọc dữ liệu từ local
function renderProject() {
  const listProject = JSON.parse(localStorage.getItem("data-project")) || [];
  let newElement = "";
  for (let i = 0; i < listProject.length; i++) {
    const project = listProject[i];
    newElement += `
    <tr>
        <td>${i + 1}</td>
        <td>${project.nameProject}</td>
        <td>${project.image}</td>
        <td>${project.link}</td>
        <td>${project.tag}</td>
        <td>
            <button onclick="deleteProject(${i})">Delete</button>
            <button onclick="updateProject(${i})">Update</button>
        </td>
    </tr>
    `;
  }
  tbodyTable.innerHTML = newElement;
}
renderProject();

// Thêm dữ liệu vào local
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const project = {
    id: Date.now(),
    nameProject: nameProject.value,
    image: imageProject.value,
    link: linkProject.value,
    tag: tagProject.value,
  };

  const projectLocal = JSON.parse(localStorage.getItem("data-project")) || [];

  if (existing) {
    // code update
    projectLocal[existingIndex] = project;
    existingIndex = -1;
    existing = false;
    btnSubmit.textContent = "+ New Project";
  } else {
    projectLocal.push(project);
   
  }


  localStorage.setItem("data-project", JSON.stringify(projectLocal));
  renderProject();
  resetForm();
});

// Reset form
function resetForm() {
  nameProject.value = "";
  imageProject.value = "";
  linkProject.value = "";
  tagProject.value = "";

}

// Xóa Project
function deleteProject(index) {
  //   console.log(index);
  const getDataLocal = JSON.parse(localStorage.getItem("data-project"));
  //   console.log(getDataLocal);
  getDataLocal.splice(index, 1);

  localStorage.setItem("data-project", JSON.stringify(getDataLocal));
  renderProject();
}

// // Update project
function updateProject(index) {
  const getDataLocal = JSON.parse(localStorage.getItem("data-project"));
  // [{}, {}, {}]
  nameProject.value = getDataLocal[index].nameProject;
  imageProject.value = getDataLocal[index].image;
  linkProject.value = getDataLocal[index].link;
  tagProject.value = getDataLocal[index].tag;

  existingIndex = index;
  existing = true;
  btnSubmit.textContent = "Update";
}