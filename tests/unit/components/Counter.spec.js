import Counter from '@/components/Counter';
import { shallowMount } from '@vue/test-utils';
describe('Counter component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  test('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should have the default value', () => {
    expect(wrapper.find('h2').exists()).toBeTruthy();

    const h2Value = wrapper.find('h2').text();

    expect(h2Value).toBe('Counter');
  });

  test('Second paragraph default value should be 0', () => {
    const pValue = wrapper.find('[data-testid=counter]').text();

    expect(pValue).toBe('0');
  });

  test('should increase by 1 the counter value', async () => {
    let pValue;

    const [increaseBtn, decreaseBtn] = wrapper.findAll('button');

    await increaseBtn.trigger('click');
    await increaseBtn.trigger('click');

    await decreaseBtn.trigger('click');

    pValue = wrapper.find('[data-testid=counter]').text();

    expect(pValue).toBe('1');
  });

  test('should set the default value', () => {
    const { start } = wrapper.props();

    const value = wrapper.find('[data-testid=counter]').text();

    expect(value).toBe(`${start}`);
  });

  test('should show the title prop', () => {
    const title = 'Counter title';

    const wrapper = shallowMount(Counter, {
      props: {
        title,
      },
    });

    const h2Value = wrapper.find('h2').text();

    expect(h2Value).toBe(title);
  });
});
