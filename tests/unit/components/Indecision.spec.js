import Indecision from '@/components/Indecision';
import { shallowMount } from '@vue/test-utils';
describe('Indecision component', () => {
  let wrapper;
  let clgSpy;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: 'yes',
          forced: false,
          image:
            'https://yesno.wtf/assets/yes/3-422e51268d64d78241720a7de52fe121.gif',
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, 'log');

    jest.clearAllMocks();
  });

  test('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Write on the input should not trigger the request (console.log) ', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

    const input = wrapper.find('input');

    await input.setValue('Hello World');

    expect(clgSpy).not.toHaveBeenCalled();
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('Typing the question mark should trigger getAnswer ', async () => {
    const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

    const input = wrapper.find('input');

    await input.setValue('Should I do this?');
    expect(clgSpy).toHaveBeenCalled();
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test('Tests on getAnswer', async () => {
    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');

    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.answer).toBe('Yes');
  });

  test('Test on getAnswer - Api error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    await wrapper.vm.getAnswer();
    const img = wrapper.find('img');
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe('Oops! Something went wrong');
  });
});
