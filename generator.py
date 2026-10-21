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
