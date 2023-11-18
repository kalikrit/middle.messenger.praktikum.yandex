import Block from '../../utils/Block';

export default class UserSettings extends Block {

  constructor() {
    super({ componentName: 'UserSettings' });
  }

  init():boolean {
    return true;
  }

  componentDidUpdate(): boolean {
    const { state } = this.props;
    /* eslint no-console: 0 */
    console.log(state);
    return true;
  }

  render() {
    const { props } = this;
    const { error } = props.state;

return (`
<div class="window">
    <form action="#" method="POST">
        <div class="usersettings">
            <div>
                <input type="file"  accept="image/*" name="avatar" id="file" style="display: none;">              
                <div class="avatar"></div>
            </div>
            <div>Ваше имя</div>
            <div>
                <div class="row">
                <div>Почта</div>
        {{{ Field 
            name="email"
            type="email"
            placeholder="Почта"
            toggle=true value=state.email
            onBlur=onBlur
            error="${error?.email || ''}"
        }}}
                </div>
                <div class="row">
                <div>Логин</div>
        {{{ Field 
            name="login"
            type="text"
            placeholder="Ваш логин"
            toggle=true value=state.login
            onBlur=onBlur
            error="${error?.email || ''}"
        }}}
                </div>
                <div class="row">
                <div>Имя</div>
        {{{ Field 
            name="first_name"
            type="text"
            placeholder="Имя"
            toggle=true value=state.first_name
            onBlur=onBlur
            error="${error?.first_name || ''}"
        }}}
                </div>
                <div class="row">
                <div>Фамилия</div>
        {{{ Field 
            name="second_name"
            type="text"
            placeholder="Фамилия"
            toggle=true value=state.second_name
            onBlur=onBlur
            error="${error?.second_name || ''}"
        }}}
                </div>
                <div class="row">
                <div>Имя в чате</div>
        {{{ Field 
            name="display_name"
            type="text"
            placeholder="Ваш ник в чате"
            toggle=true value=state.display_name
            onBlur=onBlur
            error="${error?.display_name || ''}"
        }}}
                </div>
                <div class="row">
                <div>Телефон</div>
        {{{ Field 
            name="phone"
            type="phone"
            placeholder="+7 (111) 222 33 44"
            toggle=true value=state.phone
            onBlur=onBlur
            error="${error?.phone || ''}"
        }}}
                </div>
                <div class="actions">
                    <div>
        {{{ Button
            type="submit"
            class="link-button"
            label="Изменить данные"
        }}}
                    </div>
                    <div><a href="#">Изменить пароль</a></div>
                    <div class="row">
                    <div>Старый пароль</div>
        {{{ Field 
            name="oldPassword"
            type="password"
            placeholder="Старый пароль"
            toggle=true value=state.oldPassword
            onBlur=onBlur
            error="${error?.oldPassword || ''}"
        }}}
                    </div>
                    <div class="row">
                    <div>Новый пароль</div>
        {{{ Field 
            name="newPassword"
            type="password"
            placeholder="Новый пароль"
            toggle=true value=state.newPassword
            onBlur=onBlur
            error="${error?.newPassword || ''}"
        }}}
                    </div>
                    <div class="exit-link">
                        <a href="/?page=chats">Выйти</a>
                    </div>
                </div>                      
            </div>
        </div>
    </form>
</div>
`);
  }
}
