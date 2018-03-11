import element, { attribute } from '../src/element';

test('it should create the correct output', () => {
  const element1 = new element(
    'div',
    [ 'class', 'container', 'draggable', true],
    new element(
      'p',
      [ 'class', 'text' ],
      'Hello World!',
    ),
  );
  const output1 = '<div class="container" draggable><p class="text">Hello World!</p></div>';

  expect(element1.toString()).toBe(output1);
});
