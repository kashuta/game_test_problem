// Определим 4 класса: Point, GameObject, Character b PlayingField
// Point - это просто точка на плоскости с координатами x и y
// GameObject - это игровой объект, который имеет идентификатор и позицию, которая является экземпляром класса Point
// Character - это игровой объект, который является наследником GameObject, но не имеет никаких дополнительных свойств,
// представляет персонаж игрока
// PlayingField - это игровое поле, которое имеет ширину и высоту, а также список игровых объектов, которые находятся на нем
// содержит список GameObjects и Character и имеет метод который возвращает список всех объектов в радиусе от персонажа

// определим класс Point

// TODO: вынести в отдельный файл
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

// определим метод distanceTo, который принимает данную точку и возвращает расстояние между ними по теореме Пифагора
    distanceTo(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
//TODO: вынести в отдельный файл

// определим класс GameObject
class GameObject {
    constructor(id, x, y) {
        this.id = id;
        this.position = new Point(x, y);
    }
}
//TODO: вынести в отдельный файл

// определим класс Character который наследуется от GameObject
class Character extends GameObject {}


//TODO: вынести в отдельный файл

// определим класс PlayingField
class PlayingField {
    constructor(gameObjects, character) {
        this.gameObjects = gameObjects;
        this.character = character;
    }


    //TODO: использовать  SQL запрос BETWEEN для получения объектов в радиусе "на лету"

//    constructor(db) {
//         this.db = db;
//     }
//
//     async getObjectsWithinRadius(character, radius) {
//         const minX = character.position.x - radius;
//         const maxX = character.position.x + radius;
//         const minY = character.position.y - radius;
//         const maxY = character.position.y + radius;

    //TODO: вынести в репозиторий и добавить индексы на поля x и y в таблице game_objects

//         const query = `
//       SELECT * FROM game_objects
//       WHERE x BETWEEN $1 AND $2 AND y BETWEEN $3 AND $4
//     `;
//         const values = [minX, maxX, minY, maxY];
//         const result = await this.db.query(query, values);
//         const objects = result.rows.map(row => new GameObject(row.id, row.x, row.y));
//         return objects.filter(obj => obj.position.distanceTo(character.position) <= radius);
//     }

    // определим метод getObjectsWithinRadius, который принимает радиус и возвращает список всех объектов в радиусе от персонажа
    getObjectsWithinRadius(radius) {
        // определим массив, в который будем складывать объекты в радиусе
        const objectsWithinRadius = [];
        for (const gameObject of this.gameObjects) {
            // определим расстояние от персонажа до текущего объекта
            const distance = gameObject.position.distanceTo(this.character.position);
            // если расстояние меньше радиуса, то добавляем объект в массив
            if (distance <= radius) {
                objectsWithinRadius.push(gameObject);
            }
        }
        return objectsWithinRadius;
    }
}

// пример использования
 // Создадим несколько игровых объектов и персонажа.
const gameObjects = [
    new GameObject(1, 20, 30),
    new GameObject(2, 70, 80),
    new GameObject(3, 40, 60),
    new GameObject(4, 90, 10),
    new GameObject(5, 30, 20),
    new GameObject(6, 10, 70),
    new GameObject(7, 50, 55),
    new GameObject(8, 80, 40),
    new GameObject(9, 60, 10),
    new GameObject(10, 30, 90),
];


const character = new Character(11, 50, 50);

// Создадим игровое поле и передадим в него список игровых объектов и персонажа.

const playingField = new PlayingField(gameObjects, character);

// Получим список игровых объектов в радиусе 30 от персонажа.

const radius = 30;
const objects = playingField.getObjectsWithinRadius(radius);

// Выведем список объектов в консоль.
console.log(`Объекты в радиусе ${radius} от персонажа:`);
console.log(objects);

// Выведем список объектов в консоль и их расстояние от персонажа от ближайшего к дальнему.
console.log(`Дистанция от персонажа до объектов в радиусе ${radius}`);
for (const obj of objects) {
    const distance = obj.position.distanceTo(character.position);
    console.log(`Объект с ID:${obj.id} в ${distance.toFixed(2)} единиц от персонажа.`);
}


// TODO: Доделать с Sequelize и Postgres в контейнере
// для теста с БД
// const { Client } = require('pg');
// const db = new Client();
// await db.connect();
// const character = new Character(1, 50, 50); // assuming character ID is 1
// const radius = 30; // assuming radius is in cell units
// const service = new GameObjectService(db);
// const objectsWithinRadius = await service.getObjectsWithinRadius(character, radius);
// console.log(objectsWithinRadius);
