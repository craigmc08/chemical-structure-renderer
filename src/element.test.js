import element, { attribute } from './element';

test('it should create the correct output', () => {
  const element1 = new element(
    'div',
    [ new attribute('class', 'container'), new attribute('draggable', true) ],
    new element(
      'p',
      [ new attribute('class', 'text') ],
      'Hello World!',
    ),
  );
  const output1 = '<div class="container" draggable><p class="text">Hello World!</p></div>';

  expect(root.toString()).toBe(output);
});
