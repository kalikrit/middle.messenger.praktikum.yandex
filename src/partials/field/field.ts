import Block from '../../utils/Block';

export default class Field extends Block {
  
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Field', ...props });
  }

  render() {
    return (`
<div class="input">
    {{#if toggle }}
      <label
       for="{{ name }}"
       class="label label_toggle">
         {{ label }}
      </label>
    {{/if}}
    {{{ Input
       name=name
       type=type
       label=label
       class=class
       placeholder=placeholder
       onBlur=onBlur
       value=value
    }}}
    {{#if error}} <span class="text-small text-error">{{error}}</span> {{/if}}
</div>
        `);
  }
}
