// creat load all category
const loadAllPetCategory=()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res=>res.json())
    .then(data =>displayAllPetCategory(data.pets))
    .catch(error=>console.log(error))
}
// creat display all pet  category
const  displayAllPetCategory=(pets)=>{
  allPets = pets;
  console.log(pets)
  const petContainer=document.getElementById("all-pet-category")
  const spinner=document.getElementById("spinner");
  spinner.classList.remove("hidden")
  petContainer.classList.add("hidden")
  setTimeout(() => {
    spinner.classList.add("hidden")
    petContainer.classList.remove("hidden")
  }, 2000);
  petContainer.innerHTML="";
 if(pets.length==0){
  petContainer.classList.remove("grid")
  petContainer.innerHTML=`
  <div class="flex flex-col gap-4 min-h p-9 my-4 mx-auto justify-center bg-zinc-100 rounded-lg items-center ">
    <img src="images/error.webp"/>
    <h1 class="text-3xl font-bold ">No Information Available</h1>
    <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
  </div>
  `
 }
 else{
  petContainer.classList.add("grid")
 }
  pets.forEach(pet=>{
    const card = document.createElement("div")
    card.classList="pet-card"
    card.innerHTML=`
    <div class="pet-image-box">
      <img src=${pet.image} alt="${pet.pet_name}" />
    </div>
    <div class="pet-info">
      <h2 class="pet-name">🐾 ${pet.pet_name}</h2>
      <div class="pet-detail">
        <img src="https://img.icons8.com/?size=60&id=100642&format=png" alt="breed"/>
        <p><strong>Breed:</strong> ${pet.breed? pet.breed: "No breed name"}</p>
      </div>
      <div class="pet-detail">
        <img src="https://img.icons8.com/?size=96&id=5VOqBjvi7siv&format=png" alt="birth"/>
        <p><strong>Birth:</strong> ${pet.date_of_birth? pet.date_of_birth:"No date"}</p>
      </div>
      <div class="pet-detail">
        <img src="https://img.icons8.com/?size=100&id=uMIKdjc-Fwen&format=png" alt="gender"/>
        <p><strong>Gender:</strong> ${pet.gender?pet.gender:"undefined"}</p>
      </div>
      <div class="pet-detail">
        <img src="https://img.icons8.com/?size=96&id=AjX2De5JqXqG&format=png" alt="price"/>
        <p><strong>Price:</strong> ${pet.price? pet.price + "$": "not available"}</p>
      </div>
      <div class="pet-buttons">
        <button onclick="likeBtnImageShow('${pet.image}','${pet.pet_name}')">❤️ Like</button>
        <button onclick="countDown()">👋 Adopt</button>
        <button onclick="petCategoryDetails('${pet.petId}')">📋 Details</button>
      </div>
    </div>
    `;
    petContainer.appendChild(card)
  })
}
// sort by price 
let allPets = [];
const sortByPrice = () => {
  const sorted = [...allPets].sort((a, b) => {
    const priceA = a.price || 0;
    const priceB = b.price || 0;
    return priceB - priceA;
  });
  displayAllPetCategory(sorted);
}
// like btn e image show
const likeBtnImageShow=(image,petName)=>{
  const imageContainer= document.getElementById("likeBtn")
  const img= document.createElement("img");
  img.classList="rounded-xl";
  img.src=image;
  img.alt=petName;
  imageContainer.append(img)
}
// adopt btn e countdown modal show
const countDown=()=>{
   const counterModal=document.getElementById("count-modal")
   counterModal.showModal();
   const counterNumber=document.getElementById("counter-number");
   let count=3;
   counterNumber.innerText=count;
   const showCountDown=setInterval(()=>{
    count--;
    counterNumber.innerText=count;
    if(count===1){
     clearInterval(showCountDown);
     counterModal.close();
    }

   },2000)
}
// pet er details section 
const petCategoryDetails=(id)=>{
 
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
  .then(res=>res.json())
  .then(data=>displayPetDetails(data.petData))
  .catch(error=>console.log(error))
}

const displayPetDetails=(pet)=>{
  
  const detailsContainer=document.getElementById("modal-text")
  detailsContainer.innerHTML=`
   <div class="card bg-base-100 ">
  <figure class="">
    <img  class="lg:h-[250px] lg:w-full object-cover h-[170px] w-[210px] rounded-xl p-4 "
      src=${pet.image}
      alt="Shoes" />
  </figure>
 
  <div class="lg:pl-6 pl-4 pt-0 pb-7 ">
   <h2 class="text-2xl font-bold">${pet.pet_name}</h2>
   <div class="flex gap-2">
     <img class="w-5 h-5" src="https://img.icons8.com/?size=60&id=100642&format=png"/>
     <p class="text-[17px]">Breed: ${pet.breed? pet.breed: "No breed name"}</p>
   </div>
   <div class="flex gap-2">
      <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=5VOqBjvi7siv&format=png"/>
      <p class="text-[17px]">Birth: ${pet.date_of_birth? pet.date_of_birth:"No date of birth"} </p>
   </div>
   <div class="flex gap-1">
       <img class="w-6 h-6" src="https://img.icons8.com/?size=100&id=uMIKdjc-Fwen&format=png"/>
       <p class="text-[17px]"> Gender: ${pet.gender?pet.gender:"undefined"}</p>
   </div>
    <div class="flex gap-2 ">
        <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=AjX2De5JqXqG&format=png"/>
        <p class="text-[17px]">Price: ${pet.price? pet.price + "$": "not available"}</p>
    </div>
    <div class="divider"></div>
    <div>
    <h2 class="text-1xl font-bold">Details Information</h2>
    <p>${pet.pet_details}</p>
    </div>
    </div>
  `
  document.getElementById("pet-modal").showModal()
}
// active btn remove korar section
const removeActiveBtn=()=>{
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for(let btn of buttons){
   btn.classList.remove("active");
  }
 }
//  eikhane btn er modde category wise pet gulo show korbe
const loadCategoryPet=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
  .then(res=>res.json())
  .then(data=>{
      removeActiveBtn();
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add("active");
    displayAllPetCategory(data.data);
    } )
  .catch(error=>console.log(error))
}
// button gulo dekhanor section
const loadBtnCategories = ()=>{
   fetch("https://openapi.programming-hero.com/api/peddy/categories")
   .then(res=>res.json())
   .then(data=>displayBtnCategories(data.categories))
   .catch((error)=>console.log(error))
}
const displayBtnCategories=(categories)=>{
  const categoryContainer=document.getElementById("category_btn_pet")
  console.log(categories);
  categories.forEach(item=>{
    const buttonContainer=document.createElement("div")
    buttonContainer.innerHTML=`
    <button  id="btn-${item.category}" class="btn category-btn" ><img class="lg:w-[30px] w-[15px] h-[15px] lg:h-[30px]" src="${item.category_icon}"/>${item.category}</button> `;
    buttonContainer.addEventListener("click", () => loadCategoryPet(item.category));
    categoryContainer.append(buttonContainer)
  })
}

loadBtnCategories()
loadAllPetCategory()

// Contact Form Handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    
    // Validate form
    if (!name || !email || !subject || !message) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Log form data (In a real application, you would send this to a server)
    console.log({
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toLocaleString()
    });
    
    // Show success message
    const successMessage = document.getElementById("successMessage");
    successMessage.classList.remove("hidden");
    
    // Reset form
    contactForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 5000);
  });
}