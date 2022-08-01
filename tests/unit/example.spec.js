describe('Example Component', () => {
  test('Should be greater than 10', () => {
    // Arrange
    let value = 11;

    // Act
    value++;

    // Assert
    expect(value).toBeGreaterThan(10);
  });
});
