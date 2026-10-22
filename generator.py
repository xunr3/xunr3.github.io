x = ''.join([f'''    .devezbus-debugbox[devezbus-debugpanel="{value}"]:not([devezbus-debugpanel-on]) .devezbus-debughint[devezbus-debugpanel="{value}"] {{
        display: none;
    }}
      
    .devezbus-debugbox[devezbus-debugpanel="{value}"][devezbus-debugpanel-on] .devezbus-debughint[devezbus-debugpanel="{value}"] {{
        display: block;
    }}
      
''' for i in range(16) for j in range(16) for value in [f'mod{i}-pan{j}']]).strip()

x = f'''\
@import url("https://xunr3.github.io/bugc_underclock_style.css");

@layer usingBugc{{
  /*.devezbus-debugbox {{
      display: flex;
      flex-direction: column;
  }}

  .devezbus-debugbox:is([debug-target], [full-debug-mode]) {{
      display: flex;
      flex-direction: row;
  }}*/

  .debug-boxed[debug-target] {{
      --debug-boxed-transform: initial;
      --debug-boxed-position: initial;
      --debug-boxed-overflow: initial;
      --debug-boxed-width: initial;
      --debug-boxed-height: initial;
      --debug-boxed-border: 1px solid #333333;
  }}

  :root {{
      --debug-boxed-transform: scale(0);
      --debug-boxed-position: absolute;
      --debug-boxed-overflow: hidden;
      --debug-boxed-width: 0;
      --debug-boxed-height: 0;
      --debug-boxed-border: none;
  }}

  .debug-calm-box {{
      display: inline-block;
      transform: var(--debug-boxed-transform);
      position: var(--debug-boxed-position);
      overflow: var(--debug-boxed-overflow);
      width: var(--debug-boxed-width);
      height: var(--debug-boxed-height);
      border: var(--debug-boxed-border);
  }}

  .devezbus-debugbox:not([debug-mode]) .devezbus-debughint {{
      display: none;
  }}
  
  .devezbus-debugbox[debug-mode] .devezbus-debughint {{
      display: inline;
  }}

{x}
}}\
'''

with open('devezbus.css', 'w') as fp: fp.write(x)
