// JavaScript should be written in ECMAScript 5.1.

// returns with repeat == false if will_repeat is not specified and the last element
// is an array
// if you want to specify repeat == false for the last array element (typically key
// inputs with modifiers), specify arg will_repeat = false explicitly
function keydef(description, from_key, to_key_list, conditions, will_repeat) {
  return {
    "type":"basic",
    "description":description,
    "conditions": conditions,
    "from": process_from(from_key),
    "to": key_code_list(to_key_list, will_repeat)
  }
}

function japanese_input(var_name) {
  var jpn_body = [
    {
      "input_sources": [{"language": "ja"}],
      "type": "input_source_if"
    },
    {
      "input_sources": [{"input_mode_id": "Roman$"}],
      "type":"input_source_unless"
    }
  ];
  if (var_name == null) {
    return jpn_body;
  } else {
    return [].concat(
      {
        "type": "variable_if",
        "name":  var_name,
        "value": true
      },
      jpn_body
    )
  }
}

function shifted(var_name) {
  var shifted_body = [].concat(
    japanese_input(),
    {
      "type": "variable_if",
      "name": "shifted",
      "value": true
    }
  );
  if (var_name == null) {
    return shifted_body;
  } else {
    return [].concat(
    {
      "type": "variable_if",
      "name":  var_name,
      "value": true
    },
    shifted_body
    )
  }
}

function non_shifted(var_name, is_jis_keyboard, is_im) {
  var non_shifted_body = [].concat(
  japanese_input(),
  {
    "type": "variable_unless",
    "name": "shifted",
    "value": true
  }
  );
  if (var_name != null) {
    non_shifted_body = [].concat(
      {
        "type": "variable_if",
        "name":  var_name,
        "value": true
      },
      non_shifted_body
    )
  }
  if (is_jis_keyboard) {
    non_shifted_body = [].concat(
      {
        "type": "keyboard_type_if",
        "keyboard_types": ["jis"]
      },
      non_shifted_body
    )
  }
  if (is_im) {
    non_shifted_body = [].concat(
      {
        "input_sources":[{"input_source_id": "Kotoeri"}, {"input_source_id": "Kotoeri"}],
        "type":"input_source_if"
      }
    )
  }
  return non_shifted_body;
}

function process_from(from_key) {
  if (!Array.isArray(from_key)) {
    return {"key_code": from_key};
  }
  var output = [];
  for (var i=0; i<from_key.length; i++) {
    output.push({"key_code": from_key[i]});
  }
  return {"simultaneous": output};
}

// turn a list of chars to that of {"key_code": char}
// if the last arg is defined, the last entry is {"key_code": char, "repeat": last_arg}
function key_code_list(input_list, will_repeat) {
  var output = [];
  var append = (will_repeat != "undefined" && will_repeat != null) ? true : false;
  var rep_number = (append ? input_list.length-1 : input_list.length);
  for (var i=0; i<rep_number; i++) {
    if (Array.isArray(input_list[i])) {
      output.push({"key_code": input_list[i][0], modifiers: input_list[i][1]});
    } else {
      output.push({"key_code": input_list[i]});
    }
  }
  if (append) {
    if (Array.isArray(input_list[rep_number])) {
      output.push({"key_code": input_list[rep_number][0], modifiers: input_list[rep_number][1], "repeat": will_repeat});
    } else {
      output.push({"key_code": input_list[rep_number], "repeat": will_repeat});
    }
  }
  return output;
}

//
// Main definition of rules starts from here
//
function manipulatorsA1() {
  return [
    {"description":"(シンクロ) Sp, ぬ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"w"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"n"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, り","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"e"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"r"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, ね","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"r"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"n"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, 左","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"t"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"n","modifiers":["control","shift"]}
      ]
    },
    {"description":"(シンクロ) Sp, 右","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"y"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"p","modifiers":["control","shift"]}
      ]
    },
    {"description":"(シンクロ) Sp, さ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"u"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"s"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, よ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"i"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, え","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"o"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, ゆ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"p"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, せ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"a"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"s"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, め","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"s"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"m"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, に","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"d"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"n"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, ま","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"f"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}},{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},{"set_variable":{"name":"DR","value":1}},
        {"key_code":"m"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, ち","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"g"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"t"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, や","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"h"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, の","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"j"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}},{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},{"set_variable":{"name":"DL","value":1}},
        {"key_code":"n"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, も","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"k"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"m"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, つ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"l"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"t"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, ふ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"semicolon"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"f"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, ほ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"z"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"h"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, ひ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"x"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"h"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, を","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"c"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"w"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, 、","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"v"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"comma","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, み","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"b"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"m"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, お","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"n"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, 。","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"m"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"period"},{"key_code":"return_or_enter","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, む","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"comma"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"m"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, わ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"period"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"w"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) Sp, れ","type":"basic",
      "conditions": japanese_input(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":60},
      "from":{"simultaneous":[
        {"key_code":"spacebar"},
        {"key_code":"slash"}
      ],"simultaneous_options":{"key_down_order":"strict_inverse",
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]}
      },
      "to":[{"set_variable":{"name":"shifted","value":1}},
        {"key_code":"r"},{"key_code":"e","repeat":false}
      ]
    }
  ]
}

function manipulatorsA2() {
  return [
    {"description":"(シンクロ) 編集モード1左","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"}
      ],"simultaneous_options":{"key_down_order":"strict",
      "to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}}],
      "to_if_alone":[{"key_code":"a"},{"key_code":"i"}]
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}}],
    "to_if_alone":[{"key_code":"i"},{"key_code":"a"}]},
    {"description":"(シンクロ) 編集モード1右","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"}
      ],"simultaneous_options":{"key_down_order":"strict",
      "to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}}],
      "to_if_alone":[{"key_code":"t"},{"key_code":"o"},{"key_code":"k"},{"key_code":"a"}]
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}}],
    "to_if_alone":[{"key_code":"k"},{"key_code":"a"},{"key_code":"t"},{"key_code":"o"}]},
    {"description":"(シンクロ) 編集モード2左","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"}
      ],"simultaneous_options":{"key_down_order":"strict",
      "to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}}],
      "to_if_alone":[{"key_code":"n"},{"key_code":"a"},{"key_code":"n"},{"key_code":"n"}]
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}}],
    "to_if_alone":[{"key_code":"n"},{"key_code":"n"},{"key_code":"n"},{"key_code":"a"}]},
    {"description":"(シンクロ) 編集モード2右","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"}
      ],"simultaneous_options":{"key_down_order":"strict",
      "to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}}],
      "to_if_alone":[{"key_code":"h"},{"key_code":"a"},{"key_code":"k"},{"key_code":"o"}]
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}}],
    "to_if_alone":[{"key_code":"k"},{"key_code":"o"},{"key_code":"h"},{"key_code":"a"}]},
    
    keydef("[あ, い] て → でぃ", "e", ["d", "h", "i"], non_shifted("EM1L")),
    {"description":"[な, ん] 小 → カッコ外し","type":"basic",
      "conditions": non_shifted("EM2L"),
      "from":{"key_code":"q"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"delete_or_backspace"},{"key_code":"delete_forward"},{"key_code":"v","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(UNICODE使用)[な, ん] ほ → ｜《》","type":"basic",
      "conditions": non_shifted("EM2L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"z"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"f","modifiers":["option"]},{"key_code":"f","modifiers":["option"]},{"key_code":"5","modifiers":["option"]},{"key_code":"c","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"a","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"b","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"b","modifiers":["control"]},{"key_code":"v","modifiers":["command"]},{"key_code":"f","modifiers":["control"]},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(日本語IM時)(JIS/US)[な, ん] き → +『』","type":"basic",
      "conditions":non_shifted("EM2L", true, true),
      "from":{"key_code":"w"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"close_bracket","modifiers":["shift"]},{"key_code":"v","modifiers":["command"]},{"key_code":"non_us_pound","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions":non_shifted("EM2L", false, true),
      "from":{"key_code":"w"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"open_bracket","modifiers":["shift"]},{"key_code":"v","modifiers":["command"]},{"key_code":"close_bracket","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(UNICODE使用)[な, ん] き → +『』","type":"basic",
      "conditions": non_shifted("EM2L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"w"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"e","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"f","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"v","modifiers":["command"]},{"key_code":"f","modifiers":["control"]},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(JIS/US)[な, ん] け → +（）","type":"basic",
      "conditions": non_shifted("EM2L", true),
      "from":{"key_code":"s"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"8","modifiers":["shift"]},{"key_code":"v","modifiers":["command"]},{"key_code":"9","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions": non_shifted("EM2L"),
      "from":{"key_code":"s"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"9","modifiers":["shift"]},{"key_code":"v","modifiers":["command"]},{"key_code":"0","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(日本語IM時)(JIS/US)[な, ん] ひ → +【】","type":"basic",
      "conditions":non_shifted("EM2L", true, true),
      "from":{"key_code":"x"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"8","modifiers":["option"]},{"key_code":"v","modifiers":["command"]},{"key_code":"9","modifiers":["option"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions":non_shifted("EM2L", false, true),
      "from":{"key_code":"x"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"9","modifiers":["option"]},{"key_code":"v","modifiers":["command"]},{"key_code":"0","modifiers":["option"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(UNICODE使用)[な, ん] ひ → +【】","type":"basic",
      "conditions": non_shifted("EM2L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"x"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"v","modifiers":["command"]},{"key_code":"f","modifiers":["control"]},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(JIS/US)[な, ん] か → +「」","type":"basic",
      "conditions": non_shifted("EM2L", true),
      "from":{"key_code":"f"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"close_bracket"},{"key_code":"v","modifiers":["command"]},{"key_code":"non_us_pound"},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions": non_shifted("EM2L"),
      "from":{"key_code":"f"},
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"open_bracket"},{"key_code":"v","modifiers":["command"]},{"key_code":"close_bracket"},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    }
  ]
}

function manipulatorsB() {
  return [
    {"description":"(U.S.使用)(シンクロ) あ, い, 小 → 新","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"q"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"left_arrow","modifiers":["command"]},{"key_code":"down_arrow","modifiers":["command"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(シンクロ) あ, い, ろ → ……","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"a"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"semicolon","modifiers":["option"]},{"key_code":"semicolon","modifiers":["option"]},{"key_code":"return_or_enter","repeat":false}
      ]
    },
    {"description":"(UNICODE使用)(シンクロ) あ, い, ほ → ──","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"z"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"2","modifiers":["option"]},{"key_code":"5","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"2","modifiers":["option"]},{"key_code":"2","modifiers":["option"]},{"key_code":"5","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"2","modifiers":["option"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(日本語IM時)(JIS/US)(シンクロ) あ, い, き → 『』","type":"basic",
      "conditions":non_shifted(null, true, true),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"w"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"close_bracket","modifiers":["shift"]},{"key_code":"non_us_pound","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions":non_shifted(null, false, true),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"w"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"open_bracket","modifiers":["shift"]},{"key_code":"close_bracket","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(UNICODE使用)(シンクロ) あ, い, き → 『』","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"w"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"e","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"f","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(JIS/US)(シンクロ) あ, い, け → （）","type":"basic",
      "conditions":non_shifted(null, true, false),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"s"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"8","modifiers":["shift"]},{"key_code":"9","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"s"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"9","modifiers":["shift"]},{"key_code":"0","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(日本語IM時)(JIS/US)(シンクロ) あ, い, ひ → 【】","type":"basic",
      "conditions":non_shifted(null, true, true),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"x"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"8","modifiers":["option"]},{"key_code":"9","modifiers":["option"]},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions":non_shifted(null, false, true),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"x"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"9","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(UNICODE使用)(シンクロ) あ, い, ひ → 【】","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"x"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(シンクロ) あ, い, と → ？","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"d"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"slash","modifiers":["shift"]},{"key_code":"return_or_enter","repeat":false}
      ]
    },
    {"description":"(シンクロ) あ, い, は → ！","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"c"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"1","modifiers":["shift"]},{"key_code":"return_or_enter","repeat":false}
      ]
    },
    {"description":"(シンクロ) あ, い, し → 保","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"r"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"s","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(JIS/US)(シンクロ) あ, い, か → 「」","type":"basic",
      "conditions":non_shifted(null, true, false),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"f"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"close_bracket"},{"key_code":"non_us_pound"},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"f"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"open_bracket"},{"key_code":"close_bracket"},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(U.S.使用)(シンクロ) あ, い, こ → 確定↓","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"v"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"f","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(シンクロ) あ, い, 左 → ・未確定","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"t"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"key_code":"slash","repeat":false}
      ]
    },
    {"description":"(U.S.使用)(JIS/US)(シンクロ) あ, い, (っ) → ↲「」","type":"basic",
      "conditions":non_shifted(null, true, false),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"g"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"lang1"},{"key_code":"e","modifiers":["control"]},{"key_code":"return_or_enter"},{"key_code":"close_bracket"},{"key_code":"non_us_pound"},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]}
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"g"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"lang1"},{"key_code":"e","modifiers":["control"]},{"key_code":"return_or_enter"},{"key_code":"open_bracket"},{"key_code":"close_bracket"},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"],"repeat":false}
      ]}
    },
    {"description":"(U.S.使用)(シンクロ) あ, い, そ → ↲□","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"k"},
        {"key_code":"b"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1L","value":1}},{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"lang1"},{"key_code":"e","modifiers":["control"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"}
      ]}
    },
    {"description":"(シンクロ) と, か, 右 → Home","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"y"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"a","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(U.S.使用)(シンクロ) と, か, く → 確定End","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"h"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"e","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(シンクロ) と, か, た → End","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"n"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"e","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) と, か, BS → 文末消去","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"u"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"k","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) と, か, あ → ↑","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"b","modifiers":["control"]}
      ]
    },
    {"description":"(シンクロ) と, か, な → ↓","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"m"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"f","modifiers":["control"]}
      ]
    },
    {"description":"(シンクロ) と, か, る → 再","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"i"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"lang1"},{"key_code":"lang1","repeat":false}
      ]
    },
    {"description":"(シンクロ) と, か, い → +↑","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"b","modifiers":["shift","control"]}
      ]
    },
    {"description":"(シンクロ) と, か, ん → +↓","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"comma"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"f","modifiers":["shift","control"]}
      ]
    },
    {"description":"(シンクロ) と, か, す → Del","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"delete_forward"}
      ]
    },
    {"description":"(シンクロ) と, か, う → +7↑","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"l"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]}
      ]
    },
    {"description":"(シンクロ) と, か, ら → +7↓","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"period"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]}
      ]
    },
    {"description":"(シンクロ) と, か, へ → 入力キャンセル","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"escape"},{"key_code":"escape"},{"key_code":"escape","repeat":false}
      ]
    },
    {"description":"(シンクロ) と, か, ー → カタカナ変換","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"semicolon"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"f7","repeat":false}
      ]
    },
    {"description":"(シンクロ) と, か, れ → ひらがな変換","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"f"},
        {"key_code":"slash"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM1R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM1R","value":1}},
        {"key_code":"f6","repeat":false}
      ]
    },
    {"description":"(シンクロ) な, ん, 小 → カッコ外し","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"q"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"delete_or_backspace"},{"key_code":"delete_forward"},{"key_code":"v","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(UNICODE使用)(シンクロ) な, ん, ろ → 《》","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"a"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"a","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"b","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(UNICODE使用)(シンクロ) な, ん, ほ → ｜《》","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"z"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"f","modifiers":["option"]},{"key_code":"f","modifiers":["option"]},{"key_code":"5","modifiers":["option"]},{"key_code":"c","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"a","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"b","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"b","modifiers":["control"]},{"key_code":"v","modifiers":["command"]},{"key_code":"f","modifiers":["control"]},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(日本語IM時)(JIS/US)(シンクロ) な, ん, き → +『』","type":"basic",
      "conditions":non_shifted(null, true, true),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"w"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"close_bracket","modifiers":["shift"]},{"key_code":"v","modifiers":["command"]},{"key_code":"non_us_pound","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions":non_shifted(null, false, true),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"w"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"open_bracket","modifiers":["shift"]},{"key_code":"v","modifiers":["command"]},{"key_code":"close_bracket","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(UNICODE使用)(シンクロ) な, ん, き → +『』","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"w"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"e","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"f","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"v","modifiers":["command"]},{"key_code":"f","modifiers":["control"]},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(JIS/US)(シンクロ) な, ん, け → +（）","type":"basic",
      "conditions":non_shifted(null, true, false),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"s"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"8","modifiers":["shift"]},{"key_code":"v","modifiers":["command"]},{"key_code":"9","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"s"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"9","modifiers":["shift"]},{"key_code":"v","modifiers":["command"]},{"key_code":"0","modifiers":["shift"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(日本語IM時)(JIS/US)(シンクロ) な, ん, ひ → +【】","type":"basic",
      "conditions":non_shifted(null, true, true),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"x"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"8","modifiers":["option"]},{"key_code":"v","modifiers":["command"]},{"key_code":"9","modifiers":["option"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions":non_shifted(null, false, true),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"x"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"9","modifiers":["option"]},{"key_code":"v","modifiers":["command"]},{"key_code":"0","modifiers":["option"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(UNICODE使用)(シンクロ) な, ん, ひ → +【】","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"x"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"v","modifiers":["command"]},{"key_code":"f","modifiers":["control"]},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(シンクロ) な, ん, て → 行頭□□□挿入","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"e"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"a","modifiers":["control"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"spacebar"},{"key_code":"spacebar"},{"key_code":"e","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) な, ん, と → □□□","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"d"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"spacebar"},{"key_code":"spacebar"},{"key_code":"spacebar","repeat":false}
      ]
    },
    {"description":"(シンクロ) な, ん, は → 行頭□□□戻し","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"c"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"a","modifiers":["control"]},{"key_code":"delete_or_backspace"},{"key_code":"delete_forward"},{"key_code":"delete_forward"},{"key_code":"delete_forward"},{"key_code":"e","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) な, ん, し → 行頭□挿入","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"r"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"a","modifiers":["control"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"e","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(JIS/US)(シンクロ) な, ん, か → +「」","type":"basic",
      "conditions":non_shifted(null, true, false),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"f"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"close_bracket"},{"key_code":"v","modifiers":["command"]},{"key_code":"non_us_pound"},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"f"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"x","modifiers":["command"]},{"key_code":"open_bracket"},{"key_code":"v","modifiers":["command"]},{"key_code":"close_bracket"},{"key_code":"return_or_enter"},{"key_code":"spacebar"},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) な, ん, こ → 行頭□戻し","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"v"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"a","modifiers":["control"]},{"key_code":"delete_or_backspace"},{"key_code":"delete_forward"},{"key_code":"e","modifiers":["control"],"repeat":false}
      ]
    },
    {"description":"(UNICODE使用)(シンクロ) な, ん, 左 → ○","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"t"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"2","modifiers":["option"]},{"key_code":"5","modifiers":["option"]},{"key_code":"c","modifiers":["option"]},{"key_code":"b","modifiers":["option"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    {"description":"(シンクロ) な, ん, (っ) → ／","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"g"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"key_code":"slash","modifiers":["option"]},{"key_code":"return_or_enter","repeat":false}
      ]
    },
    {"description":"(UNICODE使用)(シンクロ) な, ん, そ → x   x   x","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"comma"},
        {"key_code":"b"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2L","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2L","value":1}},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"d","modifiers":["option"]},{"key_code":"7","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"d","modifiers":["option"]},{"key_code":"7","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"d","modifiers":["option"]},{"key_code":"7","modifiers":["option"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"},{"key_code":"return_or_enter"}
      ]}
    },
    {"description":"(シンクロ) は, こ, 右 → +Home","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"y"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"a","modifiers":["shift","control"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) は, こ, く → Copy","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"h"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"c","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) は, こ, た → +End","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"n"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"e","modifiers":["shift","control"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) は, こ, BS → Cut","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"u"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"x","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) は, こ, あ → →5","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"p","modifiers":["control"]},{"key_code":"p","modifiers":["control"]},{"key_code":"p","modifiers":["control"]},{"key_code":"p","modifiers":["control"]},{"key_code":"p","modifiers":["control"]}
      ]
    },
    {"description":"(シンクロ) は, こ, な → ←5","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"m"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"n","modifiers":["control"]},{"key_code":"n","modifiers":["control"]},{"key_code":"n","modifiers":["control"]},{"key_code":"n","modifiers":["control"]},{"key_code":"n","modifiers":["control"]}
      ]
    },
    {"description":"(シンクロ) は, こ, る → Paste","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"i"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"v","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) は, こ, い → +→5","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]}
      ]
    },
    {"description":"(シンクロ) は, こ, ん → +←5","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"comma"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]}
      ]
    },
    {"description":"(シンクロ) は, こ, す → Redo","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"z","modifiers":["shift","command"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) は, こ, う → +→20","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"l"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]},{"key_code":"p","modifiers":["shift","control"]}
      ]
    },
    {"description":"(シンクロ) は, こ, ら → +←20","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"period"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]},{"key_code":"n","modifiers":["shift","control"]}
      ]
    },
    {"description":"(シンクロ) は, こ, へ → Undo","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"z","modifiers":["command"],"repeat":false}
      ]
    },
    {"description":"(シンクロ) は, こ, ー → 一行前選択","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"semicolon"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"p","modifiers":["control","shift"]}
      ]
    },
    {"description":"(シンクロ) は, こ, れ → 一行後選択","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"c"},
        {"key_code":"v"},
        {"key_code":"slash"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"EM2R","value":0}}]}
      },
      "to":[{"set_variable":{"name":"EM2R","value":1}},
        {"key_code":"n","modifiers":["control","shift"]}
      ]
    },
    
    {"description":"(シンクロ) 右濁, し, や → じゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"r"},
        {"key_code":"h"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"j"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, し, ゆ → じゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"r"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"j"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, し, よ → じょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"r"},
        {"key_code":"i"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"j"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, き, や → ぎゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"w"},
        {"key_code":"h"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"g"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, き, ゆ → ぎゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"w"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"g"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, き, よ → ぎょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"w"},
        {"key_code":"i"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"g"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ち, や → ぢゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"g"},
        {"key_code":"h"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ち, ゆ → ぢゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"g"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ち, よ → ぢょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"g"},
        {"key_code":"i"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ひ, や → びゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"x"},
        {"key_code":"h"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"b"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ひ, ゆ → びゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"x"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"b"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ひ, よ → びょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"x"},
        {"key_code":"i"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"b"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, ひ, や → ぴゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"x"},
        {"key_code":"h"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"p"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, ひ, ゆ → ぴゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"x"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"p"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, ひ, よ → ぴょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"x"},
        {"key_code":"i"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"p"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, て, い → てぃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"e"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"t"},{"key_code":"h"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, て, ゆ → てゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"e"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"t"},{"key_code":"h"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, て, い → でぃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"e"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"h"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, て, ゆ → でゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"e"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"h"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, と, う → とぅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"d"},
        {"key_code":"l"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"t"},{"key_code":"w"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, と, う → どぅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"d"},
        {"key_code":"l"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"w"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, し, え → しぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"r"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"s"},{"key_code":"y"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, ち, え → ちぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"g"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"t"},{"key_code":"y"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, し, え → じぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"r"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"j"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ち, え → ぢぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"g"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"y"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, う, あ → ヴぁ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"l"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}},{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},{"set_variable":{"name":"DL","value":1}},
        {"key_code":"v"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, う, い → ヴぃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"l"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"v"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, う, え → ヴぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"l"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"v"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, う, お → ヴぉ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"l"},
        {"key_code":"n"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"v"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, う, ゆ → ヴゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"l"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"v"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, う, い → うぃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"l"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"w"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, う, え → うぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"l"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"w"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, う, お → うぉ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"l"},
        {"key_code":"n"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"w"},{"key_code":"h"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, い, え → いぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"k"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"y"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, く, あ → くぁ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"h"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}},{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},{"set_variable":{"name":"DL","value":1}},
        {"key_code":"q"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, く, い → くぃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"h"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"q"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, く, え → くぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"h"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"q"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, く, お → くぉ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"h"},
        {"key_code":"n"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"q"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, く, わ → くゎ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"h"},
        {"key_code":"l"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"k"},{"key_code":"u"},{"key_code":"x"},{"key_code":"w"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, く, あ → ぐぁ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"h"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}},{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},{"set_variable":{"name":"DL","value":1}},
        {"key_code":"g"},{"key_code":"w"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, く, い → ぐぃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"h"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"g"},{"key_code":"w"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, く, え → ぐぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"h"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"g"},{"key_code":"w"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, く, お → ぐぉ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"h"},
        {"key_code":"n"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"g"},{"key_code":"w"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, く, わ → ぐゎ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"h"},
        {"key_code":"l"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"g"},{"key_code":"u"},{"key_code":"x"},{"key_code":"w"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, ふ, あ → ふぁ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"semicolon"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}},{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},{"set_variable":{"name":"DL","value":1}},
        {"key_code":"f"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, ふ, い → ふぃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"semicolon"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"f"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, ふ, え → ふぇ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"semicolon"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"f"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, ふ, お → ふぉ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"semicolon"},
        {"key_code":"n"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"f"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, ふ, ゆ → ふゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"semicolon"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"f"},{"key_code":"u"},{"key_code":"x"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    
    {"description":"[右濁] (シンクロ) し, や → じゃ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"r"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"j"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) し, ゆ → じゅ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"r"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"j"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) し, よ → じょ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"r"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"j"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) き, や → ぎゃ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"w"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"g"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) き, ゆ → ぎゅ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"w"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"g"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) き, よ → ぎょ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"w"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"g"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) ち, や → ぢゃ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"g"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"d"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) ち, ゆ → ぢゅ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"g"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"d"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) ち, よ → ぢょ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"g"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"d"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) ひ, や → びゃ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"x"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"b"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) ひ, ゆ → びゅ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"x"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"b"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) ひ, よ → びょ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"x"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"b"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[右半] (シンクロ) ひ, や → ぴゃ","type":"basic",
      "conditions": non_shifted("HL"),
      "from":{"simultaneous":[
        {"key_code":"x"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"p"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[右半] (シンクロ) ひ, ゆ → ぴゅ","type":"basic",
      "conditions": non_shifted("HL"),
      "from":{"simultaneous":[
        {"key_code":"x"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"p"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[右半] (シンクロ) ひ, よ → ぴょ","type":"basic",
      "conditions": non_shifted("HL"),
      "from":{"simultaneous":[
        {"key_code":"x"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"p"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[右半] (シンクロ) て, い → てぃ","type":"basic",
      "conditions": non_shifted("HL"),
      "from":{"simultaneous":[
        {"key_code":"e"},
        {"key_code":"k"}
      ]},
      "to":[{"key_code":"t"},{"key_code":"h"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"[右半] (シンクロ) て, ゆ → てゅ","type":"basic",
      "conditions": non_shifted("HL"),
      "from":{"simultaneous":[
        {"key_code":"e"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"t"},{"key_code":"h"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) て, い → でぃ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"e"},
        {"key_code":"k"}
      ]},
      "to":[{"key_code":"d"},{"key_code":"h"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) て, ゆ → でゅ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"e"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"d"},{"key_code":"h"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[右半] (シンクロ) と, う → とぅ","type":"basic",
      "conditions": non_shifted("HL"),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"l"}
      ]},
      "to":[{"key_code":"t"},{"key_code":"w"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) と, う → どぅ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"l"}
      ]},
      "to":[{"key_code":"d"},{"key_code":"w"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[右半] (シンクロ) し, え → しぇ","type":"basic",
      "conditions": non_shifted("HL"),
      "from":{"simultaneous":[
        {"key_code":"r"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"s"},{"key_code":"y"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[右半] (シンクロ) ち, え → ちぇ","type":"basic",
      "conditions": non_shifted("HL"),
      "from":{"simultaneous":[
        {"key_code":"g"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"t"},{"key_code":"y"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) し, え → じぇ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"r"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"j"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[右濁] (シンクロ) ち, え → ぢぇ","type":"basic",
      "conditions": non_shifted("DL"),
      "from":{"simultaneous":[
        {"key_code":"g"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"d"},{"key_code":"y"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) う, あ → ヴぁ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"l"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"v"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) う, い → ヴぃ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"l"},
        {"key_code":"k"}
      ]},
      "to":[{"key_code":"v"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) う, え → ヴぇ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"l"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"v"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) う, お → ヴぉ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"l"},
        {"key_code":"n"}
      ]},
      "to":[{"key_code":"v"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) う, ゆ → ヴゅ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"l"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"v"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) う, い → うぃ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"l"},
        {"key_code":"k"}
      ]},
      "to":[{"key_code":"w"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) う, え → うぇ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"l"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"w"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) う, お → うぉ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"l"},
        {"key_code":"n"}
      ]},
      "to":[{"key_code":"w"},{"key_code":"h"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) い, え → いぇ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"k"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"y"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) く, あ → くぁ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"q"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) く, い → くぃ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"k"}
      ]},
      "to":[{"key_code":"q"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) く, え → くぇ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"q"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) く, お → くぉ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"n"}
      ]},
      "to":[{"key_code":"q"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) く, わ → くゎ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"l"}
      ]},
      "to":[{"key_code":"k"},{"key_code":"u"},{"key_code":"x"},{"key_code":"w"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) く, あ → ぐぁ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"g"},{"key_code":"w"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) く, い → ぐぃ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"k"}
      ]},
      "to":[{"key_code":"g"},{"key_code":"w"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) く, え → ぐぇ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"g"},{"key_code":"w"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) く, お → ぐぉ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"n"}
      ]},
      "to":[{"key_code":"g"},{"key_code":"w"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[左濁] (シンクロ) く, わ → ぐゎ","type":"basic",
      "conditions": non_shifted("DR"),
      "from":{"simultaneous":[
        {"key_code":"h"},
        {"key_code":"l"}
      ]},
      "to":[{"key_code":"g"},{"key_code":"u"},{"key_code":"x"},{"key_code":"w"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) ー, あ → ふぁ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"semicolon"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"f"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) ー, い → ふぃ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"semicolon"},
        {"key_code":"k"}
      ]},
      "to":[{"key_code":"f"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) ー, え → ふぇ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"semicolon"},
        {"key_code":"o"}
      ]},
      "to":[{"key_code":"f"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) ー, お → ふぉ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"semicolon"},
        {"key_code":"n"}
      ]},
      "to":[{"key_code":"f"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"[左半] (シンクロ) ー, ゆ → ふゅ","type":"basic",
      "conditions": non_shifted("HR"),
      "from":{"simultaneous":[
        {"key_code":"semicolon"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"f"},{"key_code":"u"},{"key_code":"x"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    
    {"description":"(シンクロ) 左濁, さ → ざ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"u"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"z"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, す → ず","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"z"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, く → ぐ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"h"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"g"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, つ → づ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"l"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"d"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, ふ → ぶ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"semicolon"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"b"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半濁, ふ → ぷ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"semicolon"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"p"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, た → だ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"n"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"d"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左濁, へ → べ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"f"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"b"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, け → げ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"s"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"g"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, て → で","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"e"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, し → じ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"r"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"z"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, せ → ぜ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"a"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"z"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, き → ぎ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"w"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"g"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, と → ど","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"d"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, か → が","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"f"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}},{"set_variable":{"name":"DR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},{"set_variable":{"name":"DR","value":1}},
        {"key_code":"g"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ち → ぢ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"g"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"d"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ほ → ぼ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"z"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"b"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, ひ → び","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"x"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"b"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, は → ば","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"c"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"b"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, こ → ご","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"v"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"g"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右濁, そ → ぞ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"j"},
        {"key_code":"b"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"z"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 左半, へ → ぺ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HR","value":1}},
        {"key_code":"p"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, ほ → ぽ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"z"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"p"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, ひ → ぴ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"x"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"p"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"(シンクロ) 右半, は → ぱ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"m"},
        {"key_code":"c"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},
        {"key_code":"p"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) み, や → みゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"b"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"m"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) み, ゆ → みゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"b"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"m"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) み, よ → みょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"b"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"m"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) り, や → りゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"e"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"r"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) り, ゆ → りゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"e"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"r"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) り, よ → りょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"e"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"r"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) し, や → しゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"r"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"s"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) し, ゆ → しゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"r"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"s"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) し, よ → しょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"r"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"s"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) き, や → きゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"w"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"k"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) き, ゆ → きゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"w"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"k"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) き, よ → きょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"w"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"k"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) に, や → にゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"n"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) に, ゆ → にゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"n"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) に, よ → にょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"d"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"n"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) ち, や → ちゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"g"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"t"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) ち, ゆ → ちゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"g"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"t"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) ち, よ → ちょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"g"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"t"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) ひ, や → ひゃ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"x"},
        {"key_code":"h"}
      ]},
      "to":[{"key_code":"h"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) ひ, ゆ → ひゅ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"x"},
        {"key_code":"p"}
      ]},
      "to":[{"key_code":"h"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) ひ, よ → ひょ","type":"basic",
      "conditions": non_shifted(),
      "from":{"simultaneous":[
        {"key_code":"x"},
        {"key_code":"i"}
      ]},
      "to":[{"key_code":"h"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    
    {"description":"(シンクロ) 小, や → (ゃ)","type":"basic",
      "conditions": japanese_input(),
      "from":{"simultaneous":[
        {"key_code":"q"},
        {"key_code":"h"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
      },
      "to":[{"set_variable":{"name":"KO","value":1}},
        {"key_code":"x"},{"key_code":"y"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 小, ゆ → (ゅ)","type":"basic",
      "conditions": japanese_input(),
      "from":{"simultaneous":[
        {"key_code":"q"},
        {"key_code":"p"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
      },
      "to":[{"set_variable":{"name":"KO","value":1}},
        {"key_code":"x"},{"key_code":"y"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 小, よ → (ょ)","type":"basic",
      "conditions": japanese_input(),
      "from":{"simultaneous":[
        {"key_code":"q"},
        {"key_code":"i"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
      },
      "to":[{"set_variable":{"name":"KO","value":1}},
        {"key_code":"x"},{"key_code":"y"},{"key_code":"o","repeat":false}
      ]
    },
    {"description":"(シンクロ) 小, あ → (ぁ)","type":"basic",
      "conditions": japanese_input(),
      "from":{"simultaneous":[
        {"key_code":"q"},
        {"key_code":"j"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
      },
      "to":[{"set_variable":{"name":"KO","value":1}},
        {"key_code":"x"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 小, い → (ぃ)","type":"basic",
      "conditions": japanese_input(),
      "from":{"simultaneous":[
        {"key_code":"q"},
        {"key_code":"k"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
      },
      "to":[{"set_variable":{"name":"KO","value":1}},
        {"key_code":"x"},{"key_code":"i","repeat":false}
      ]
    },
    {"description":"[Sp] (シンクロ) 小, わ → (ゎ)","type":"basic",
      "conditions": shifted(),
      "from":{"simultaneous":[
        {"key_code":"q"},
        {"key_code":"l"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
      },
      "to":[{"set_variable":{"name":"KO","value":1}},
        {"key_code":"x"},{"key_code":"w"},{"key_code":"a","repeat":false}
      ]
    },
    {"description":"(シンクロ) 小, う → (ぅ)","type":"basic",
      "conditions": japanese_input(),
      "from":{"simultaneous":[
        {"key_code":"q"},
        {"key_code":"l"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
      },
      "to":[{"set_variable":{"name":"KO","value":1}},
        {"key_code":"x"},{"key_code":"u","repeat":false}
      ]
    },
    {"description":"(シンクロ) 小, え → (ぇ)","type":"basic",
      "conditions": japanese_input(),
      "from":{"simultaneous":[
        {"key_code":"q"},
        {"key_code":"o"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
      },
      "to":[{"set_variable":{"name":"KO","value":1}},
        {"key_code":"x"},{"key_code":"e","repeat":false}
      ]
    },
    {"description":"(シンクロ) 小, お → (ぉ)","type":"basic",
      "conditions": japanese_input(),
      "from":{"simultaneous":[
        {"key_code":"q"},
        {"key_code":"n"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
      },
      "to":[{"set_variable":{"name":"KO","value":1}},
        {"key_code":"x"},{"key_code":"o","repeat":false}
      ]
    },
    keydef("(シンクロ) く, あ → IME ON", ["h", "j"], ["lang1"], [{"type": "variable_unless", "name": "shifted", "value": true}], false),
    keydef("(シンクロ) か, (っ) → IME OFF", ["f", "g"], ["lang2"], [{"type": "variable_unless", "name": "shifted", "value": true}], false),
    {"description":"(シンクロ) こ, な → 行送り","type":"basic",
      "conditions": japanese_input(),
      "from":{"simultaneous":[
        {"key_code":"v"},
        {"key_code":"m"}
      ],"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"HL","value":0}},{"set_variable":{"name":"HR","value":0}}]}
      },
      "to":[{"set_variable":{"name":"HL","value":1}},{"set_variable":{"name":"HR","value":1}},
        {"key_code":"return_or_enter","repeat":false}
      ]
    },
    
    {"description":"[Sp] スペースキー","type":"basic",
      "conditions": shifted(),
      "from":{"key_code":"spacebar","modifiers":{"mandatory":["shift"]}},
      "to":[{"key_code":"spacebar","modifiers":["shift"]}
      ]
    },
    {"description":"スペースキー","type":"basic",
      "conditions": japanese_input(),
      "from":{"key_code":"spacebar"},
      "to":[{"set_variable":{"name":"shifted","value":true}}],
      "to_if_alone":[{"key_code":"spacebar"}],
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":false}}]
    },
    
    {"description":"[あ, い] 小 → 新","type":"basic",
      "conditions": non_shifted("EM1L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"q"},
      "to":[{"set_variable":{"name":"EM1L","value":1}},
        {"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}
      ],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"left_arrow","modifiers":["command"]},{"key_code":"down_arrow","modifiers":["command"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    keydef("[あ, い] ろ → ……", "a", [["semicolon", ["option"]], ["semicolon", ["option"]], "return_or_enter"], non_shifted("EM1L"), false),
    {"description":"(UNICODE使用)[あ, い] ほ → ──","type":"basic",
      "conditions": non_shifted("EM1L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"z"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"2","modifiers":["option"]},{"key_code":"5","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"2","modifiers":["option"]},{"key_code":"2","modifiers":["option"]},{"key_code":"5","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"2","modifiers":["option"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    keydef("(日本語IM時)(JIS/US)[あ, い] き → 『』", "w", [["close_bracket", ["shift"]], ["non_us_pound", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", true, true), false),
    keydef("", "w", [["open_bracket", ["shift"]], ["close_bracket", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", false, true), false),
    {"description":"(UNICODE使用)[あ, い] き → 『』","type":"basic",
      "conditions": non_shifted("EM1L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"w"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"e","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"f","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    keydef("(JIS/US)[あ, い] け → （）", "s", [["8", ["shift"]], ["9", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", true)),
    keydef("", "s", [["9", ["shift"]], ["0", ["shift"]], "return_or_enter", ["b", ["control"]]],  non_shifted("EM1L"), false),
    keydef("(日本語IM時)(JIS/US)[あ, い] ひ → 【】", "x", [["8", ["option"]], ["9", ["option"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", true, true), false),
    keydef("", "x", [["9", ["option"]], ["0", ["option"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", false, true), false),
    {"description":"(UNICODE使用)[あ, い] ひ → 【】","type":"basic",
      "conditions": non_shifted("EM1L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"x"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"1","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    keydef("[あ, い] と → ？", "d", [["slash", ["shift"]], "return_or_enter"], non_shifted("EM1L"), false),
    keydef("[あ, い] は → ！", "c", [["1", ["shift"]], "return_or_enter"], non_shifted("EM1L"), false),
    keydef("[あ, い] し → 保", "r", [["s", ["command"]]], non_shifted("EM1L"), false),
    keydef("(JIS/US)[あ, い] か → 「」", "f", ["close_bracket", "non_us_pound", "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", true), false),
    keydef("", "f", ["open_bracket", "close_bracket", "return_or_enter", ["b", ["control"]]], non_shifted("EM1L"), false),
    {"description":"(U.S.使用)[あ, い] こ → 確定↓","type":"basic",
      "conditions": non_shifted("EM1L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"v"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"f","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    keydef("[あ, い] 左 → ・未確定", "t", ["slash"], non_shifted("EM1L")),
    {"description":"(U.S.使用)(JIS/US)[あ, い] (っ) → ↲「」","type":"basic",
      "conditions": non_shifted("EM1L", true),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"g"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"lang1"},{"key_code":"e","modifiers":["control"]},{"key_code":"return_or_enter"},{"key_code":"close_bracket"},{"key_code":"non_us_pound"},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"]}
      ]}
    },
    {"type":"basic",
      "conditions": non_shifted("EM1L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"g"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"lang1"},{"key_code":"e","modifiers":["control"]},{"key_code":"return_or_enter"},{"key_code":"open_bracket"},{"key_code":"close_bracket"},{"key_code":"return_or_enter"},{"key_code":"b","modifiers":["control"]}
      ]}
    },
    {"description":"(U.S.使用)[あ, い] そ → ↲□","type":"basic",
      "conditions": non_shifted("EM1L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"b"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"lang1"},{"key_code":"e","modifiers":["control"]},{"key_code":"return_or_enter"},{"key_code":"spacebar"}
      ]}
    },
    keydef("[と, か] 右 → Home", "y", [["a", ["control"]]], non_shifted("EM1R"), false),
    {"description":"(U.S.使用)[と, か] く → 確定End","type":"basic",
      "conditions": non_shifted("EM1R"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"h"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.US"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"e","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    keydef("[と, か] た → End", "n", [["e", ["control"]]], non_shifted("EM1R"), false),
    keydef("[と, か] BS → 文末消去", "u", [["k", ["control"]]], non_shifted("EM1R"), false),
    keydef("[と, か] あ → ↑", "j", [["b", ["control"]]], non_shifted("EM1R")),
    keydef("[と, か] な → ↓", "m", [["f", ["control"]]], non_shifted("EM1R")),
    keydef("[と, か] る → 再", "i", ["lang1", "lang1"], non_shifted("EM1R")),
    keydef("[と, か] い → +↑", "k", [["b", ["shift","control"]]], non_shifted("EM1R")),
    keydef("[と, か] ん → +↓", "comma", [["f", ["shift","control"]]], non_shifted("EM1R")),
    keydef("[と, か] す → Del", "o", ["delete_forward"], non_shifted("EM1R")),
    {"description":"[と, か] う → +7↑","type":"basic",
      "conditions": non_shifted("EM1R"),
      "from":{"key_code":"l"},
      "to":[{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]},{"key_code":"b","modifiers":["shift","control"]}
      ]
    },
    {"description":"[と, か] ら → +27↓","type":"basic",
      "conditions": non_shifted("EM1R"),
      "from":{"key_code":"period"},
      "to":[{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]},{"key_code":"f","modifiers":["shift","control"]}
      ]
    },
    keydef("[と, か] へ → 入力キャンセル", "p", ["escape", "escape", "escape"], non_shifted("EM1R")),
    keydef("[と, か] ー → カタカナ変換", "semicolon", ["f7"], non_shifted("EM1R")),
    keydef("[と, か] れ → ひらがな変換", "slash", ["f6"], non_shifted("EM1R")),
    {"description":"(UNICODE使用)[な, ん] ろ → 《》","type":"basic",
      "conditions": non_shifted("EM2L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"a"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"a","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"b","modifiers":["option"]},{"key_code":"b","modifiers":["control"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    keydef("[な, ん] て → 行頭□□□挿入", "e", [["a", ["control"]], "return_or_enter", "spacebar", "spacebar", "spacebar", ["e", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] と → □□□", "d", ["spacebar", "spacebar", "spacebar"], non_shifted("EM2L")),
    keydef("[な, ん] は → 行頭□□□戻し", "c", [["a", ["control"]], "delete_or_backspace", "delete_forward", "delete_forward", "delete_forward", ["e", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] し → 行頭□挿入", "r", [["a", ["control"]], "return_or_enter", "spacebar", ["e", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] こ → 行頭□戻し", "v", [["a", ["control"]], "delete_or_backspace", "delete_forward", ["e", ["control"]]], non_shifted("EM2L"), false),
    {"description":"(UNICODE使用)[な, ん] 左 → ○","type":"basic",
      "conditions": non_shifted("EM2L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"t"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"2","modifiers":["option"]},{"key_code":"5","modifiers":["option"]},{"key_code":"c","modifiers":["option"]},{"key_code":"b","modifiers":["option"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"}
      ]}
    },
    keydef("[な, ん] (っ) → ／", "g", [["slash", ["option"]], "return_or_enter"], non_shifted("EM2L"), false),
    {"description":"(UNICODE使用)[な, ん] そ → x   x   x","type":"basic",
      "conditions": non_shifted("EM2L"),
      "parameters":{"basic.to_delayed_action_delay_milliseconds":30},
      "from":{"key_code":"b"},
      "to":[{"select_input_source":{"input_source_id":"com.apple.keylayout.UnicodeHexInput"}}],
      "to_delayed_action":{"to_if_invoked":[
        {"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"d","modifiers":["option"]},{"key_code":"7","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"d","modifiers":["option"]},{"key_code":"7","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"3","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"0","modifiers":["option"]},{"key_code":"d","modifiers":["option"]},{"key_code":"7","modifiers":["option"]},{"key_code":"lang1","modifiers":["shift"]},{"key_code":"lang1"},{"key_code":"return_or_enter"}
      ]}
    },
    keydef("[は, こ] 右 → +Home", "y", [["a", ["shift","control"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] く → Copy", "h", [["c", ["command"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] た → +End", "n", [["e", ["shift","control"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] BS → Cut", "u", [["x", ["command"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] あ → →5", "j", [["p", ["control"]], ["p", ["control"]], ["p", ["control"]], ["p", ["control"]], ["p", ["control"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] な → ←5", "m", [["n", ["control"]], ["n", ["control"]], ["n", ["control"]], ["n", ["control"]], ["n", ["control"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] る → Paste", "i", [["v", ["command"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] い → +→5", "k", [["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] ん → +←5", "comma", [["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] す → Redo", "o", [["z", ["shift","command"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] う → +→20", "l", [["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]]], non_shifted("EM2R")),
    keydef("[は, こ] ら → +←20", "period", [["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]]], non_shifted("EM2R")),
    keydef("[は, こ] へ → Undo", "p", [["z", ["command"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] ー → 一行前選択", "semicolon", [["p", ["control","shift"]]], non_shifted("EM2R")),
    keydef("[は, こ] れ → 一行後選択", "slash", [["n", ["control","shift"]]], non_shifted("EM2R")),
    
    keydef("[左濁] さ → ざ", "u", ["z", "a"], non_shifted("DR")),
    keydef("[左濁] す → ず", "o", ["z", "u"], non_shifted("DR")),
    keydef("[左濁] く → ぐ", "h", ["g", "u"], non_shifted("DR")),
    keydef("[左濁] ふ → ぶ", "semicolon", ["b", "u"], non_shifted("DR")),
    keydef("[左半濁] ふ → ぷ", "semicolon", ["p", "u"], non_shifted("DR")),
    keydef("[左濁] た → だ", "n", ["d", "a"], non_shifted("DR")),
    keydef("[左濁] つ → づ", "l", ["d", "u"], non_shifted("DR")),
    keydef("[左濁] へ → べ", "p", ["b", "e"], non_shifted("DR")),
    keydef("[左濁] あ → が", "j", ["g", "a"], non_shifted("DR")),
    keydef("[右濁] け → げ", "s", ["g", "e"], non_shifted("DL")),
    keydef("[右濁] て → で", "e", ["d", "e"], non_shifted("DL")),
    keydef("[右濁] し → じ", "r", ["z", "i"], non_shifted("DL")),
    keydef("[右濁] せ → ぜ", "a", ["z", "e"], non_shifted("DL")),
    keydef("[右濁] き → ぎ", "w", ["g", "i"], non_shifted("DL")),
    keydef("[右濁] と → ど", "d", ["d", "o"], non_shifted("DL")),
    keydef("[右濁] か → が", "f", ["g", "a"], non_shifted("DL")),
    keydef("[右濁] ち → ぢ", "g", ["d", "i"], non_shifted("DL")),
    keydef("[右濁] ほ → ぼ", "z", ["b", "o"], non_shifted("DL")),
    keydef("[右濁] ひ → び", "x", ["b", "i"], non_shifted("DL")),
    keydef("[右濁] は → ば", "c", ["b", "a"], non_shifted("DL")),
    keydef("[右濁] こ → ご", "v", ["g", "o"], non_shifted("DL")),
    keydef("[右濁] そ → ぞ", "b", ["z", "o"], non_shifted("DL")),
    keydef("[左半] へ → ぺ", "p", ["p", "e"], non_shifted("HR")),
    keydef("[右半] ほ → ぽ", "z", ["p", "o"], non_shifted("HL")),
    keydef("[右半] ひ → ぴ", "x", ["p", "i"], non_shifted("HL")),
    keydef("[右半] は → ぱ", "c", ["p", "a"], non_shifted("HL")),
    keydef("[小] や → (ゃ)", "h", ["x", "y", "a"], japanese_input("KO")),
    keydef("[小] ゆ → (ゅ)", "p", ["x", "y", "u"], japanese_input("KO")),
    keydef("[小] よ → (ょ)", "i", ["x", "y", "o"], japanese_input("KO")),
    keydef("[小] あ → (ぁ)", "j", ["x", "a"], japanese_input("KO")),
    keydef("[小] い → (ぃ)", "k", ["x", "i"], japanese_input("KO")),
    keydef("[Sp, 小] う → (ゎ)", "l", ["x", "w", "a"], shifted("KO")),
    keydef("[小] う → (ぅ)", "l", ["x", "u"], japanese_input("KO")),
    keydef("[小] え → (ぇ)", "o", ["x", "e"], japanese_input("KO")),
    keydef("[小] お → (ぉ)", "n", ["x", "o"], japanese_input("KO")),
    keydef("[こ] な → 行送り", "m", ["return_or_enter"], japanese_input("HR")),
    keydef("[な] こ → 行送り", "v", ["return_or_enter"], japanese_input("HL")),
    
    keydef("[Sp] ぬ", "w", ["n", "u"], shifted()),
    keydef("[Sp] り", "e", ["r", "i"], shifted()),
    keydef("[Sp] ね", "r", ["n", "e"], shifted()),
    keydef("[Sp] 左", "t", [["n", ["control","shift"]]], shifted()),
    keydef("[Sp] 右", "y", [["p", ["control","shift"]]], shifted()),
    keydef("[Sp] さ", "u", ["s", "a"], shifted()),
    keydef("[Sp] よ", "i", ["y", "o"], shifted()),
    keydef("[Sp] え", "o", ["e"], shifted()),
    keydef("[Sp] ゆ", "p", ["y", "u"], shifted()),
    keydef("[Sp] せ", "a", ["s", "e"], shifted()),
    keydef("[Sp] め", "s", ["m", "e"], shifted()),
    keydef("[Sp] に", "d", ["n", "i"], shifted()),
    {"description":"[Sp] ま","type":"basic",
      "conditions": shifted(),
      "from":{"key_code":"f"},
      "to":[{"set_variable":{"name":"DR","value":1}},
        {"key_code":"m"},{"key_code":"a","repeat":false}
      ],
      "to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]
    },
    keydef("[Sp] ち", "g", ["t", "i"], shifted()),
    keydef("[Sp] や", "h", ["y", "a"], shifted()),
    {"description":"[Sp] の","type":"basic",
      "conditions": shifted(),
      "from":{"key_code":"j"},
      "to":[{"set_variable":{"name":"DL","value":1}},
        {"key_code":"n"},{"key_code":"o","repeat":false}
      ],
      "to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]
    },
    keydef("[Sp] も", "k", ["m", "o"], shifted()),
    keydef("[Sp] つ", "l", ["t", "u"], shifted()),
    keydef("[Sp] ふ", "semicolon", ["f", "u"], shifted()),
    keydef("[Sp] を", "c", ["w", "o"], shifted()),
    keydef("[Sp] 、", "v", ["comma"], shifted()),
    keydef("[Sp] み", "b", ["m", "i"], shifted()),
    keydef("[Sp] お", "n", ["o"], shifted()),
    keydef("[Sp] 。", "m", ["period", "return_or_enter"], shifted()),
    keydef("[Sp] む", "comma", ["m", "u"], shifted()),
    keydef("[Sp] わ", "period", ["w", "a"], shifted()),
    
    keydef("ヴ", "q", ["v", "u"], japanese_input()),
    keydef("き", "w", ["k", "i"], japanese_input()),
    keydef("て", "e", ["t", "e"], japanese_input()),
    keydef("し", "r", ["s", "i"], japanese_input()),
    keydef("左", "t", [["n", ["control"]]], japanese_input()),
    keydef("右", "y", [["p", ["control"]]], japanese_input()),
    keydef("BS", "u", ["delete_or_backspace"], japanese_input()),
    keydef("る", "i", ["r", "u"], japanese_input()),
    keydef("す", "o", ["s", "u"], japanese_input()),
    keydef("へ", "p", ["h", "e"], japanese_input()),
    keydef("ろ", "a", ["r", "o"], japanese_input()),
    keydef("け", "s", ["k", "e"], japanese_input()),
    keydef("と", "d", ["t", "o"], japanese_input()),
    keydef("か", "f", ["k", "a"], japanese_input()),
    keydef("(っ)", "g", ["x", "t", "u"], japanese_input()),
    keydef("く", "h", ["k", "u"], japanese_input()),
    keydef("あ", "j", ["a"], japanese_input()),
    keydef("い", "k", ["i"], japanese_input()),
    keydef("う", "l", ["u"], japanese_input()),
    keydef("ー", "semicolon", ["hyphen"], japanese_input()),
    keydef("ほ", "z", ["h", "o"], japanese_input()),
    keydef("ひ", "x", ["h", "i"], japanese_input()),
    keydef("は", "c", ["h", "a"], japanese_input()),
    keydef("こ", "v", ["k", "o"], japanese_input()),
    keydef("そ", "b", ["s", "o"], japanese_input()),
    keydef("た", "n", ["t", "a"], japanese_input()),
    keydef("な", "m", ["n", "a"], japanese_input()),
    keydef("ん", "comma", ["n", "n"], japanese_input()),
    keydef("ら", "period", ["r", "a"], japanese_input()),
    keydef("れ", "slash", ["r", "e"], japanese_input())
  ]
}

function manipulatorsC1() {
  return [
  {"description":"左シフトキー","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"left_shift"},
    "to":[{"set_variable":{"name":"shifted","value":1}},
      {"key_code":"left_shift"}
    ],
    "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]
  },
  {"description":"右シフトキー","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"right_shift"},
    "to":[{"set_variable":{"name":"shifted","value":1}},
      {"key_code":"right_shift"}
    ],
    "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]
  },
  {"description":"[Sp] (シンクロ) 小, わ → (ゎ)","type":"basic",
    "conditions": japanese_input(),
    "from":{"simultaneous":[
      {"key_code":"q"},
      {"key_code":"l"}
    ],"modifiers":{"mandatory":["shift"]}
      ,"simultaneous_options":{"to_after_key_up":[{"set_variable":{"name":"KO","value":0}}]}
    },
    "to":[{"set_variable":{"name":"KO","value":1}},
      {"key_code":"x"},{"key_code":"w"},{"key_code":"a","repeat":false}
    ]
  },
  {"description":"[Sp] ぬ","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"w","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"n"},{"key_code":"u","repeat":false}
    ]
  },
  {"description":"[Sp] り","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"e","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"r"},{"key_code":"i","repeat":false}
    ]
  },
  {"description":"[Sp] ね","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"r","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"n"},{"key_code":"e","repeat":false}
    ]
  },
  {"description":"[Sp] 左","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"t","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"n","modifiers":["control","shift"]}
    ]
  },
  {"description":"[Sp] 右","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"y","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"p","modifiers":["control","shift"]}
    ]
  },
  {"description":"[Sp] さ","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"u","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"s"},{"key_code":"a","repeat":false}
    ]
  },
  {"description":"[Sp] よ","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"i","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"y"},{"key_code":"o","repeat":false}
    ]
  },
  {"description":"[Sp] え","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"o","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"e","repeat":false}
    ]
  },
  {"description":"[Sp] ゆ","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"p","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"y"},{"key_code":"u","repeat":false}
    ]
  },
  {"description":"[Sp] せ","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"a","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"s"},{"key_code":"e","repeat":false}
    ]
  },
  {"description":"[Sp] め","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"s","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"m"},{"key_code":"e","repeat":false}
    ]
  },
  {"description":"[Sp] に","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"d","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"n"},{"key_code":"i","repeat":false}
    ]
  },
  {"description":"[Sp] ま","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"f","modifiers":{"mandatory":["shift"]}},
    "to":[{"set_variable":{"name":"DR","value":1}},
      {"key_code":"m"},{"key_code":"a","repeat":false}
    ],
    "to_after_key_up":[{"set_variable":{"name":"DR","value":0}}]
  },
  {"description":"[Sp] ち","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"g","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"t"},{"key_code":"i","repeat":false}
    ]
  },
  {"description":"[Sp] や","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"h","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"y"},{"key_code":"a","repeat":false}
    ]
  },
  {"description":"[Sp] の","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"j","modifiers":{"mandatory":["shift"]}},
    "to":[{"set_variable":{"name":"DL","value":1}},
      {"key_code":"n"},{"key_code":"o","repeat":false}
    ],
    "to_after_key_up":[{"set_variable":{"name":"DL","value":0}}]
  },
  {"description":"[Sp] も","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"k","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"m"},{"key_code":"o","repeat":false}
    ]
  },
  {"description":"[Sp] つ","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"l","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"t"},{"key_code":"u","repeat":false}
    ]
  },
  {"description":"[Sp] ふ","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"semicolon","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"f"},{"key_code":"u","repeat":false}
    ]
  },
  {"description":"[Sp] を","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"c","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"w"},{"key_code":"o","repeat":false}
    ]
  },
  {"description":"[Sp] 、","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"v","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"comma","repeat":false}
    ]
  },
  {"description":"[Sp] み","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"b","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"m"},{"key_code":"i","repeat":false}
    ]
  },
  {"description":"[Sp] お","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"n","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"o","repeat":false}
    ]
  },
  {"description":"[Sp] 。","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"m","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"period"},{"key_code":"return_or_enter","repeat":false}
    ]
  },
  {"description":"[Sp] む","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"comma","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"m"},{"key_code":"u","repeat":false}
    ]
  },
  {"description":"[Sp] わ","type":"basic",
    "conditions": japanese_input(),
    "from":{"key_code":"period","modifiers":{"mandatory":["shift"]}},
    "to":[{"key_code":"w"},{"key_code":"left_arrow","repeat":false}
    ]
  }
  ]
}

function manipulatorsC2() {
  return [
    {"description":"エンターキー","type":"basic",
      "conditions": japanese_input(),
      "from":{"key_code":"return_or_enter"},
      "to":[{"set_variable":{"name":"shifted","value":1}}],
      "to_if_alone":[{"key_code":"return_or_enter"}],
      "to_after_key_up":[{"set_variable":{"name":"shifted","value":0}}]
    }
  ]
}

function main() {
  console.log(
    JSON.stringify(
      {
        "title":"Japanese NAGINATA STYLE (v16) ※A群、B群、C群の順に登録してください。同じ群の順序は自由です。",
        "rules":[
          {
            "description":"A1: 薙刀式v16アルファ版《同時連続シフト拡張》",
            "manipulators": manipulatorsA1()
          },
          {
            "description":"A2: 薙刀式v16以降《編集モード簡便化》",
            "manipulators": manipulatorsA2()
          },
          {
            "description":"B: 薙刀式v16アルファ版",
            "manipulators": manipulatorsB()
          },
          {
            "description":"C1: 薙刀式《左右シフトかな拡張》",
            "manipulators": manipulatorsC1()
          },
          {
            "description":"C2: 薙刀式《エンター同時押しシフト拡張》",
            "manipulators": manipulatorsC2()
          }
        ]
      }, null, '  '
    )
  )
}

main()
