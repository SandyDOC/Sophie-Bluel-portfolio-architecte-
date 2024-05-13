const fetchWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}

const fetchCategories = async () => {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
};

// fetch('http://localhost:5678/api/categories')
//   .then(response => response.json())

// const reponse = await fetch("http://localhost:5678/api/categories");
// const fetchCategories = await reponse.json();

// async function fetchCategories() {
//     const response = await fetch('http://localhost:5678/api/categories')
//     return await response.json();
// }