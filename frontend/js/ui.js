// js/ui.js
document.addEventListener("DOMContentLoaded", function() {
    const citySelect = document.getElementById("city");
    const placesList = document.getElementById("places-list");
    const hotelsList = document.getElementById("hotels-list");
  
    // Функция для загрузки мест по выбранному городу
    function loadPlaces(city) {
      placesList.innerHTML = "Загрузка мест...";
      hotelsList.innerHTML = ""; // очищаем список отелей
  
      Api.fetchPlaces(city)
        .then(places => {
          placesList.innerHTML = "";
          if (places.length === 0) {
            placesList.innerHTML = "<p>Места для посещения не найдены.</p>";
          } else {
            places.forEach(place => {
              const placeItem = document.createElement("div");
              placeItem.className = "place";
              placeItem.textContent = place.name;
              placeItem.dataset.placeId = place.id;
              placeItem.style.cursor = "pointer";
              // При клике переключаем состояние выбранного элемента
              placeItem.addEventListener("click", function() {
                placeItem.classList.toggle("selected");
                loadHotelsForSelected();
              });
              placesList.appendChild(placeItem);
            });
          }
        })
        .catch(error => {
          placesList.innerHTML = `<p>Ошибка при загрузке: ${error}</p>`;
        });
    }
  
    // Функция для загрузки отелей для всех выбранных мест
    function loadHotelsForSelected() {
      hotelsList.innerHTML = "Загрузка отелей...";
      const selectedPlaces = document.querySelectorAll(".place.selected");
  
      if (selectedPlaces.length === 0) {
        hotelsList.innerHTML = "<p>Пожалуйста, выберите место(а).</p>";
        return;
      }
      
      // Собираем массив промисов для всех выбранных мест
      const promises = Array.from(selectedPlaces).map(placeItem => {
        const placeId = placeItem.dataset.placeId;
        const placeName = placeItem.textContent;
        return Api.fetchHotels(placeId).then(hotels => ({ placeId, placeName, hotels }));
      });
  
      Promise.all(promises)
        .then(results => {
          hotelsList.innerHTML = "";
          results.forEach(result => {
            // Заголовок для группы отелей выбранного места
            const header = document.createElement("h3");
            header.textContent = `Отели рядом с ${result.placeName}:`;
            hotelsList.appendChild(header);
            
            if (result.hotels.length === 0) {
              const noHotelsMsg = document.createElement("p");
              noHotelsMsg.textContent = "Отели не найдены.";
              hotelsList.appendChild(noHotelsMsg);
            } else {
              result.hotels.forEach(hotel => {
                const hotelItem = document.createElement("div");
                hotelItem.className = "hotel-item";
                hotelItem.style.display = "flex";
                hotelItem.style.alignItems = "center";
                hotelItem.style.marginBottom = "10px";
                hotelItem.innerHTML = `
                  <img src="${hotel.photo}" alt="${hotel.name}" style="width:100px; height:100px; border-radius:5px; margin-right: 10px;">
                  <div>
                    <strong>${hotel.name}</strong><br>
                    ${hotel.address}<br>
                    Рейтинг: ${hotel.rating} / 5
                  </div>
                `;
                hotelsList.appendChild(hotelItem);
              });
            }
          });
        })
        .catch(error => {
          hotelsList.innerHTML = `<p>Ошибка при загрузке отелей: ${error}</p>`;
        });
    }
  
    // Загрузка мест для изначально выбранного города
    loadPlaces(citySelect.value);
  
    // Обработчик изменения выбора города
    citySelect.addEventListener("change", function() {
      loadPlaces(citySelect.value);
    });
  });
  