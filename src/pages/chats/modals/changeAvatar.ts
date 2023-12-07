import Block from '../../../utils/Block';
import UserController from '../../../controller/UserController';

const uctl = new UserController();
export default class ChangeAvatar extends Block {
  constructor(props: Record<string, any>) {
    super({
      componentName: 'ChangeAvatar',
      ...props,
    });
  }

  init(): boolean {
    this.events = {
      submit: this.onSubmit.bind(this),
      click: (e) => e.stopPropagation(),
    };
    return true;
  }

  onSubmit(event: Record<string, any>) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const formObject = Object.fromEntries(formData.entries());
    const obj: any = formObject.avatar;
    // console.log(obj.size);
    // если передан файл. Проверяем по размеру.
    // 5000 - минимальный размер jpg картинки 100х100
    if (obj.size >= 5000) {
      uctl.avatar(formData);
      this.router.go('usettings');
    }
  }

  render() {
    // const { props } = this;
    // const { avatar } = props.state;

    return (`
<div class="window">
<div class="card">
  <h2>Выберите изображение</h2>
  <form>
    <div class="input-box">
      {{{ Field 
          name="avatar" 
          label="Изображение"
          value=state.message   
          type="file"
          }}}
    </div>
    {{{ Button
      type="submit"
      class="button"
      label="Загрузить"
    }}}
    {{{ ButtonBack }}}
  </form>
</div>
</div>
`);
  }
}
