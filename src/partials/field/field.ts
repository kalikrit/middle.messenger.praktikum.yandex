import Block from '../../utils/Block';

export default class Field extends Block {
  constructor(props: Array<Record<string, any>>) {
    super({ componentName: 'Field', ...props });
  }

  render() {
    return (`
<div class="{{ class }}">
      <label
       for="{{ name }}">
         {{ label }}
      </label>
    {{{ Input
       id=id
       name=name
       type=type
       label=label
       class=class
       placeholder=placeholder
       autocomplete=autocomplete
       onBlur=onBlur
       value=value
    }}}
    {{#if error}} 
      <div class="error">
        {{error}}
      </div> 
    {{/if}}
</div>
    `);
  }
}
