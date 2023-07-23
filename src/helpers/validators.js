import { allPass, pipe, not, equals } from "ramda";
/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const isWhite = (figure) => (figure === 'white');
const isRed = (figure) => (figure === 'red');
const isGreen = (figure) => (figure === 'green');
const isOrange = (figure) => (figure === 'orange');
const isBlue = (figure) => (figure === 'blue');

const countColors = (props) => (
    Object.getOwnPropertyNames(props).reduce((prev, figure) => {
        prev[props[figure]] = (prev[props[figure]] || 0) + 1;
        return prev;
    }, {})
);
const countColor = (color) => (pipe(countColors, (props) => (props[color] || 0))); 
const moreThan = (n) => ((x) => (x > n));
const equalAnswers = (fn1, fn2) => ((props) => (fn1(props) === fn2(props)));

const getTriangle = ({triangle}) => (triangle);
const getSquare = ({square}) => (square);

const isStarRed = ({star}) => (isRed(star));
const isStarWhite = ({star}) => (isWhite(star));
const isSquareGreen = ({square}) => (isGreen(square));
const isTriangleWhite = ({triangle}) => (isWhite(triangle));
const isCircleWhite = ({circle}) => (isWhite(circle));
const isCircleBlue = ({circle}) => (isBlue(circle));
const isSquareOrange = ({square}) => (isOrange(square));
const isTriangleGreen = ({triangle}) => (isGreen(triangle));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
    isStarRed,
    isSquareGreen,
    isTriangleWhite,
    isCircleWhite
])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = pipe(countColor('green'), moreThan(1));

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = equalAnswers(countColor('red'), countColor('blue'));

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
    isCircleBlue,
    isStarRed,
    isSquareOrange
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = pipe(
    countColors,
    (colors) => (Object.getOwnPropertyNames(colors)
        .map((color) => (color === 'white' ? 0 :    colors[color]))),
    (arr) => (Math.max(...arr)),
    moreThan(2)
)

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
    isTriangleGreen,
    pipe(countColor('green'), equals(2)),
    pipe(countColor('red'), equals(1))
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = pipe(countColor('orange'), equals(4));

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([
    pipe(isStarRed, not),
    pipe(isStarWhite, not)
]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = pipe(countColor('green'), equals(4));

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
    pipe(isTriangleWhite, not),
    equalAnswers(getSquare, getTriangle)
]);
