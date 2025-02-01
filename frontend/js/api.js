// js/api.js
const Api = (function() {
    // Обновлённые данные для мест в каждом городе
    const placesData = {
      astana: [
        { id: 1, name: "Байтерек", lat: 51.128, lng: 71.430 },
        { id: 2, name: "Мечеть Хазрет Султан", lat: 51.210, lng: 71.430 },
        { id: 3, name: "Национальный музей", lat: 51.176, lng: 71.420 },
        { id: 4, name: "Мега", lat: 51.180, lng: 71.450 },
        { id: 5, name: "Керуен", lat: 51.190, lng: 71.440 },
        { id: 6, name: "Азия Парк", lat: 51.200, lng: 71.460 },
        { id: 7, name: "Сарыарка торговый дом", lat: 51.210, lng: 71.420 },
        { id: 8, name: "Алау", lat: 51.220, lng: 71.430 }
      ],
      almaty: [
        { id: 9, name: "Есентай Молл", lat: 43.250, lng: 76.930 },
        { id: 10, name: "Медеу", lat: 43.160, lng: 76.950 },
        { id: 11, name: "Кок-Тобе", lat: 43.260, lng: 76.990 },
        { id: 12, name: "Музей", lat: 43.180, lng: 76.940 }
      ],
      shymkent: [
        { id: 13, name: "Парк Абая", lat: 42.320, lng: 69.590 },
        { id: 14, name: "Центральная мечеть", lat: 42.345, lng: 69.610 },
        { id: 15, name: "Музей краеведения", lat: 42.350, lng: 69.580 }
      ]
    };
  
    // Обновлённые данные для отелей – добавлены поля photo и rating
    const hotelsData = {
      // Астана
      1: [
        { id: 101, name: "Astana Hotel", address: "ул. Байтерека, 123", photo: "https://via.placeholder.com/150?text=Astana+Hotel", rating: 4.2 },
        { id: 102, name: "Tower Inn", address: "ул. Башни, 45", photo: "https://via.placeholder.com/150?text=Tower+Inn", rating: 4.0 }
      ],
      2: [
        { id: 103, name: "Mosque View Hotel", address: "проспект Мечети, 67", photo: "https://via.placeholder.com/150?text=Mosque+View+Hotel", rating: 4.1 }
      ],
      3: [
        { id: 104, name: "Museum Lodge", address: "ул. Музея, 89", photo: "https://via.placeholder.com/150?text=Museum+Lodge", rating: 4.3 }
      ],
      4: [
        { id: 105, name: "Mega Plaza Hotel", address: "ул. Мега, 10", photo: "https://via.placeholder.com/150?text=Mega+Plaza+Hotel", rating: 4.5 }
      ],
      5: [
        { id: 106, name: "Keruen Comfort", address: "ул. Керуен, 20", photo: "https://via.placeholder.com/150?text=Keruen+Comfort", rating: 4.0 }
      ],
      6: [
        { id: 107, name: "Asia Park Resort", address: "ул. Азия Парк, 30", photo: "https://via.placeholder.com/150?text=Asia+Park+Resort", rating: 4.7 }
      ],
      7: [
        { id: 108, name: "Saryarka Inn", address: "ул. Сарыарка, 40", photo: "https://via.placeholder.com/150?text=Saryarka+Inn", rating: 4.2 }
      ],
      8: [
        { id: 109, name: "Alau Grand Hotel", address: "ул. Алау, 50", photo: "https://via.placeholder.com/150?text=Alau+Grand+Hotel", rating: 4.6 }
      ],
      // Алматы
      9: [
        { id: 201, name: "Esentai Hotel", address: "ул. Есентай, 60", photo: "https://via.placeholder.com/150?text=Esentai+Hotel", rating: 4.5 }
      ],
      10: [
        { id: 202, name: "Medeu Inn", address: "ул. Медеу, 70", photo: "https://via.placeholder.com/150?text=Medeu+Inn", rating: 4.3 }
      ],
      11: [
        { id: 203, name: "Koktobe Resort", address: "ул. Кок-Тобе, 80", photo: "https://via.placeholder.com/150?text=Koktobe+Resort", rating: 4.7 }
      ],
      12: [
        { id: 204, name: "Museum View Hotel", address: "ул. Музея, 90", photo: "https://via.placeholder.com/150?text=Museum+View+Hotel", rating: 4.4 }
      ],
      // Шымкент
      13: [
        { id: 301, name: "Parkside Hotel", address: "ул. Абая, 10", photo: "https://via.placeholder.com/150?text=Parkside+Hotel", rating: 4.0 }
      ],
      14: [
        { id: 302, name: "Central Inn", address: "ул. Мечети, 20", photo: "https://via.placeholder.com/150?text=Central+Inn", rating: 3.9 }
      ],
      15: [
        { id: 303, name: "History Hotel", address: "ул. Истории, 30", photo: "https://via.placeholder.com/150?text=History+Hotel", rating: 4.2 }
      ]
    };
  
    // Новая функция для получения фотографий отеля через RapidAPI
    function fetchHotelPhotos(hotelId) {
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'hotels4.p.rapidapi.com',
          'x-rapidapi-key': '470859ab95mshb1fe683dcdea87cp1fdbf0jsn1c856e0c3579'
        }
      };
  
      return fetch(`https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=${hotelId}`, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка при загрузке фотографий');
          }
          return response.json();
        })
        .then(data => {
          // Здесь можно выполнить дополнительную обработку данных, если необходимо
          return data;
        })
        .catch(err => {
          console.error("Ошибка API fetchHotelPhotos:", err);
          return null;
        });
    }
  
    return {
      // Метод для получения мест по выбранному городу
      fetchPlaces: function(city) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (placesData[city]) {
              resolve(placesData[city]);
            } else {
              reject("Город не найден");
            }
          }, 500); // имитация задержки
        });
      },
      // Метод для получения отелей по id места
      fetchHotels: function(placeId) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (hotelsData[placeId]) {
              resolve(hotelsData[placeId]);
            } else {
              resolve([]); // если отелей нет – возвращаем пустой массив
            }
          }, 500);
        });
      },
      // Новый метод для получения фотографий отеля через API RapidAPI
      fetchHotelPhotos: fetchHotelPhotos
    };
  })();
  