// JavaScript should be written in ECMAScript 5.1.

//
// transmit_varの取り得る値は以下の通り
// DL: 右濁音キーモード　DR: 左濁音キーモード HL: 右半濁音キーモード HR: 左半濁音キーモード KO: 小文字キーモード
// EM1L: 編集モード左1面 EM1R: 編集モード右1面 EM2L: 編集モード左2面 EM2R: 編集モード右2面
//

// keydef(): 基本となるキー定義
//    description:  定義の説明
//    from_key:     押下したキー。同時押下の場合は配列で渡す。
//    to_key_list:  解釈されるべきキーの組み合わせの配列。特定のキーが修飾キーを伴う場合は、配列[key, [modfiers]]で渡す。
//    conditions:   定義が発動される条件
//    will_repeat:  to_key_listの最後のキーが繰り返されるか否か
//    transmit_var_list:  受け渡される変数の配列
//    threshold:          basic.simultaneous_threshold_millisecondsのミリ秒での値
//    to_after_key_up_var:  to_after_key_upにtransmit_var_listを渡すか否か
//    mondatory_modifiers_list: from_keyのmondatory_modifiersに渡すキー配列
function keydef(description, from_key, to_key_list, conditions, will_repeat, transmit_var_list, threshold, to_after_key_up_var, mondatory_modifiers_list) {
  output = {
    "type":"basic",
    "description": description,
    "conditions": conditions,
    "from": process_from(from_key, transmit_var_list, null, mondatory_modifiers_list),
    "to": key_code_list(to_key_list, will_repeat, transmit_var_list)
  };
  if (threshold != "undefined" && threshold != null) {
    output.paramters = {"basic.simultaneous_threshold_milliseconds": threshold}
  }
  if (to_after_key_up_var) {
    for (var i=0; i<transmit_var_list.length; i++) {
      output.to_after_key_up = {"set_variable": {"name": transmit_var_list[i], "value": false}}
    }
  }
  return output;
}

function delayed(description, from_key, to_delayed_list, input_source_id, conditions, will_repeat, transmit_var_list, does_precut) {
  return {
    "type":"basic",
    "description": description,
    "conditions": conditions,
    "parameters": {"basic.to_delayed_action_delay_milliseconds": 30},
    "from": process_from(from_key, transmit_var_list),
    "to": input_source(input_source_id, transmit_var_list, does_precut),
    "to_delayed_action":{"to_if_invoked": key_code_list(to_delayed_list, will_repeat)}
  }
}

// inverse() transmits variable "shifted" by default
function inverse(description, from_key, to_key_list, conditions, will_repeat, transmit_var_list) {
  var opt_var = ["shifted"];
  if (transmit_var_list != "undefined" && transmit_var_list != null) {
    opt_var.concat(transmit_var_list);
  }
  return {
    "type":"basic",
    "description": description,
    "conditions": conditions,
    "parameters": {"basic.simultaneous_threshold_milliseconds": 60},
    "from": process_from(from_key, ["shifted"], "strict_inverse"),
    "to": key_code_list(to_key_list, will_repeat, ["shifted"])
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
  if (var_name != null && var_name != "undefined") {
    non_shifted_body = [].concat(
      {
        "type": "variable_if",
        "name":  var_name,
        "value": true
      },
      non_shifted_body
    );
  }
  if (is_jis_keyboard) {
    non_shifted_body = [].concat(
      {
        "type": "keyboard_type_if",
        "keyboard_types": ["jis"]
      },
      non_shifted_body
    );
  }
  if (is_im) {
    non_shifted_body = [].concat(
      {
        "input_sources":[{"input_source_id": "Kotoeri"}, {"input_source_id": "atok"}],
        "type":"input_source_if"
      },
      non_shifted_body
    );
  }
  return non_shifted_body;
}

function process_from(from_key, transmit_var_list, key_down_order, mondatory_modifiers_list) {
  if (!Array.isArray(from_key)) {
    output = {"key_code": from_key};
  } else {
    var simul_keys = [];
    for (var i=0; i<from_key.length; i++) {
      simul_keys.push({"key_code": from_key[i]});
    }
    var output = {"simultaneous": simul_keys};
    if (transmit_var_list != "undefined" && transmit_var_list != null) {
      var opt_var = [];
      for (var i=0; i<transmit_var_list.length; i++) {
        opt_var.push({"set_variable": {"name": transmit_var_list[i], "value": false}});
      }
      output.simultaneous_options = {"to_after_key_up": opt_var};
      if (key_down_order != "undefined" && key_down_order != null) {
        output.simultaneous_options.key_down_order = key_down_order
      }
    }
  }
  if (mondatory_modifiers_list != "undefined" && mondatory_modifiers_list != null) {
    output.modifiers = {"mandatory": mondatory_modifiers_list};
  }
  return output;
}

// turn a list of chars to that of {"key_code": char}
// if the last arg is defined, the last entry is {"key_code": char, "repeat": last_arg}
function key_code_list(input_list, will_repeat, transmit_var_list) {
  var output = [];
  if (transmit_var_list != "undefined" && transmit_var_list != null) {
    for (var i=0; i<transmit_var_list.length; i++) {
      output.push({"set_variable": {"name": transmit_var_list[i], "value": true}})
    }
  }
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

function input_source(source, transmit_var_list, does_precut) {
  var output = [];
  if (transmit_var_list != "undefined" && transmit_var_list != null) {
    for (var i=0; i<transmit_var_list.length; i++) {
      output.push({"set_variable": {"name": transmit_var_list[i], "value": true}})
    }
  }
  if (does_precut)
    output.push({"key_code":"x", "modifiers":["command"]})
  output.push({"select_input_source": {"input_source_id": source}});

  return output;
}

// unicodeを上記関数群に渡せる形に変換。
//  code_list:      unicodeの配列
//  postkeys_list:  unicodeを出力した後に出力するキー群の配列
// ex. unicode(["f00e", "f00f"], [["b", ["control"]]])
function unicode(code_list, postkeys_list) {
  output = [];
  for (var j=0; j<code_list.length; j++) {
    for (var i=0; i<code_list[j].length; i++) {
      output.push([code_list[j][i], ["option"]]);
    }
  }
  if (postkeys_list != "undefined" && postkeys_list != null) {
    output.concat(postkeys_list);
  }
  return output;
}

//
// Main definition of rules starts from here
//
function manipulatorsA1() {
  return [
    inverse("(シンクロ) Sp, ぬ", ["spacebar", "w"], ["n", "u"], japanese_input(), false),
    inverse("(シンクロ) Sp, り", ["spacebar", "e"], ["r", "i"], japanese_input(), false),
    inverse("(シンクロ) Sp, め", ["spacebar", "r"], ["m", "e"], japanese_input(), false),
    inverse("(シンクロ) Sp, 左", ["spacebar", "t"], [["n", ["control", "shift"]]], japanese_input()),
    inverse("(シンクロ) Sp, 右", ["spacebar", "y"], [["p", ["control", "shift"]]], japanese_input()),
    inverse("(シンクロ) Sp, さ", ["spacebar", "u"], ["s", "a"], japanese_input(), false),
    inverse("(シンクロ) Sp, よ", ["spacebar", "i"], ["y", "o"], japanese_input(), false),
    inverse("(シンクロ) Sp, え", ["spacebar", "o"], ["e"], japanese_input(), false),
    inverse("(シンクロ) Sp, ゆ", ["spacebar", "p"], ["y", "u"], japanese_input(), false),
    inverse("(シンクロ) Sp, せ", ["spacebar", "a"], ["s", "e"], japanese_input(), false),
    inverse("(シンクロ) Sp, み", ["spacebar", "s"], ["m", "i"], japanese_input(), false),
    inverse("(シンクロ) Sp, に", ["spacebar", "d"], ["n", "i"], japanese_input(), false),
    inverse("(シンクロ) Sp, ま", ["spacebar", "f"], ["m", "a"], japanese_input(), false, ["DR"]),
    inverse("(シンクロ) Sp, ち", ["spacebar", "g"], ["t", "i"], japanese_input(), false),
    inverse("(シンクロ) Sp, や", ["spacebar", "h"], ["y", "a"], japanese_input(), false),
    inverse("(シンクロ) Sp, の", ["spacebar", "j"], ["n", "o"], japanese_input(), false, ["DL"]),
    inverse("(シンクロ) Sp, も", ["spacebar", "k"], ["m", "o"], japanese_input(), false),
    inverse("(シンクロ) Sp, つ", ["spacebar", "l"], ["t", "u"], japanese_input(), false),
    inverse("(シンクロ) Sp, ふ", ["spacebar", "semicolon"], ["f", "u"], japanese_input(), false),
    inverse("(シンクロ) Sp, ほ", ["spacebar", "z"], ["h", "o"], japanese_input(), false),
    inverse("(シンクロ) Sp, ひ", ["spacebar", "x"], ["h", "i"], japanese_input(), false),
    inverse("(シンクロ) Sp, を", ["spacebar", "c"], ["w", "o"], japanese_input(), false),
    inverse("(シンクロ) Sp, 、", ["spacebar", "v"], ["comma"], japanese_input(), false),
    inverse("(シンクロ) Sp, む", ["spacebar", "b"], ["m", "u"], japanese_input(), false),
    inverse("(シンクロ) Sp, お", ["spacebar", "n"], ["o"], japanese_input(), false),
    inverse("(シンクロ) Sp, 。", ["spacebar", "m"], ["period", "return_or_enter"], japanese_input(), false),
    inverse("(シンクロ) Sp, ね", ["spacebar", "comma"], ["n", "e"], japanese_input(), false),
    inverse("(シンクロ) Sp, わ", ["spacebar", "period"], ["w", "a"], japanese_input(), false),
    inverse("(シンクロ) Sp, れ", ["spacebar", "slash"], ["r", "e"], japanese_input(), false),
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
    keydef("[な, ん] 小 → カッコ外し", "q", [["x", ["command"]], "delete_or_backspace", "delete_forward", ["v", ["command"]]], non_shifted("EM2L"), false, ["EM2L"]),
    delayed("(UNICODE使用)[な, ん] ほ → ｜《》", "z", [["f", ["option"]], ["f", ["option"]], ["5", ["option"]], ["c", ["option"]], ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["a", ["option"]], ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["b", ["option"]], ["b", ["control"]], ["b", ["control"]], ["v", ["command"]], ["f", ["control"]], "spacebar", ["b", ["shift","control"]], ["x", ["command"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), false, ["EM2L"], true),
    keydef("(日本語IM時)(JIS/US)[な, ん] き → +『』", "w", [["x", ["command"]], ["close_bracket", ["shift"]], ["v", ["command"]], ["non_us_pound", ["shift"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted("EM2L", true, true), false, ["EM2L"]),
    keydef("", "w", [["x", ["command"]], ["open_bracket", ["shift"]], ["v", ["command"]], ["close_bracket", ["shift"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted("EM2L", false, true), false, ["EM2L"]),
    delayed("(UNICODE使用)[な, ん] き → +『』", "w", [["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["e", ["option"]], ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["f", ["option"]], ["b", ["control"]], ["v", ["command"]], ["f", ["control"]], "spacebar", ["b", ["shift","control"]], ["x", ["command"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), false, ["EM2L"], true),
    keydef("(JIS/US)[な, ん] け → +（）", "s", [["x", ["command"]], ["8", ["shift"]], ["v", ["command"]], ["9", ["shift"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted("EM2L", true), false, ["EM2L"]),
    keydef("", "s", [["x", ["command"]], ["9", ["shift"]], ["v", ["command"]], ["0", ["shift"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted("EM2L"), false, ["EM2L"]),
    keydef("(日本語IM時)(JIS/US)[な, ん] ひ → +【】", "x", [["x", ["command"]], ["8", ["option"]], ["v", ["command"]], ["9", ["option"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted("EM2L", true, true), false, ["EM2L"]),
    keydef("", "x", [["x", ["command"]], ["9", ["option"]], ["v", ["command"]], ["0", ["option"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted("EM2L", false, true), false, ["EM2L"]),
    delayed("(UNICODE使用)[な, ん] ひ → +【】", "x", [["3", ["option"]], ["0", ["option"]], ["1", ["option"]], ["0", ["option"]], ["3", ["option"]], ["0", ["option"]], ["1", ["option"]], ["1", ["option"]], ["b", ["control"]], ["v", ["command"]], ["f", ["control"]], "spacebar", ["b", ["shift","control"]], ["x", ["command"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), false, ["EM2L"], true),
    keydef("(JIS/US)[な, ん] か → +「」", "f", [["x", ["command"]], "close_bracket", ["v", ["command"]], "non_us_pound", "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted("EM2L", true), false, ["EM2L"]),
    keydef("", "f", [["x", ["command"]], "open_bracket", ["v", ["command"]], "close_bracket", "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted("EM2L"), false, ["EM2L"])
  ]
}

function manipulatorsB() {
  return [
    delayed("(U.S.使用)(シンクロ) あ, い, 小 → 新", ["j", "k", "q"], [["left_arrow", ["command"]], ["down_arrow", ["command"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.US", non_shifted(), null, ["EM1L"]),
    keydef("(シンクロ) あ, い, ろ → ……", ["j", "k", "a"], [["semicolon", ["option"]], ["semicolon", ["option"]], "return_or_enter"], non_shifted(), false, ["EM1L"]),
    delayed("(UNICODE使用)(シンクロ) あ, い, ほ → ──", ["j", "k", "z"], [["2", ["option"]], ["5", ["option"]], ["0", ["option"]], ["2", ["option"]], ["2", ["option"]], ["5", ["option"]], ["0", ["option"]], ["2", ["option"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM1L"]),
    // keydef("(日本語IM時)(JIS/US)(シンクロ) あ, い, き → 『』", ["j", "k", "w"], [["close_bracket", ["shift"]], ["non_us_pound", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted(null, true, true), false, ["EM1L"]),
    keydef("(日本語IM時)(JIS)(シンクロ) あ, い, き → ／", ["j", "k", "w"], [["slash", ["option"]], "return_or_enter"], non_shifted(null, true, true), false, ["EM1L"]),
    // keydef("", ["j", "k", "w"], [["open_bracket", ["shift"]], ["close_bracket", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted(null, false, true), false, ["EM1L"]),
    keydef("(日本語IM時)(US)(シンクロ) あ, い, き → ／", ["j", "k", "w"], [["slash", ["option"]], "return_or_enter"], non_shifted(null, false, true), false, ["EM1L"]),
    // delayed("(UNICODE使用)(シンクロ) あ, い, き → 『』", ["j", "k", "w"], [["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["e", ["option"]], ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["f", ["option"]], ["b", ["control"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM1L"]),
    delayed("(UNICODE使用)(シンクロ) あ, い, き → ／", ["j", "k", "w"], unicode(["ff0f"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM1L"]),
    keydef("(JIS/US)(シンクロ) あ, い, け → （）", ["j", "k", "s"], [["8", ["shift"]], ["9", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted(null, true, false), false, ["EM1L"]),
    keydef("", ["j", "k", "s"], [["9", ["shift"]], ["0", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted(), false, ["EM1L"]),
    keydef("(日本語IM時)(JIS/US)(シンクロ) あ, い, ひ → 【】", ["j", "k", "x"], [["8", ["option"]], ["9", ["option"]], "return_or_enter", ["b", ["control"]]], non_shifted(null, true, true), false, ["EM1L"]),
    keydef("", ["j", "k", "x"], [["9", ["option"]], ["0", ["option"]], "return_or_enter", ["b", ["control"]]], non_shifted(null, false, true), false, ["EM1L"]),
    delayed("(UNICODE使用)(シンクロ) あ, い, ひ → 【】", ["j", "k", "x"], [["3", ["option"]], ["0", ["option"]], ["1", ["option"]], ["0", ["option"]], ["3", ["option"]], ["0", ["option"]], ["1", ["option"]], ["1", ["option"]], ["b", ["control"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM1L"]),
    keydef("(シンクロ) あ, い, と → ？", ["j", "k", "d"], [["slash", ["shift"]], "return_or_enter"], non_shifted(), false, ["EM1L"]),
    keydef("(シンクロ) あ, い, は → ！", ["j", "k", "c"], [["1", ["shift"]], "return_or_enter"], non_shifted(), false, ["EM1L"]),
    keydef("(シンクロ) あ, い, し → 保", ["j", "k", "r"], [["s", ["command"]]], non_shifted(), false, ["EM1L"]),
    keydef("(JIS/US)(シンクロ) あ, い, か → 「」", ["j", "k", "f"], ["close_bracket", "non_us_pound", "return_or_enter", ["b", ["control"]]], non_shifted(null, true, false), false, ["EM1L"]),
    keydef("", ["j", "k", "f"], ["open_bracket", "close_bracket", "return_or_enter", ["b", ["control"]]], non_shifted(), false, ["EM1L"]),
    delayed("(U.S.使用)(シンクロ) あ, い, こ → 確定↓", ["j", "k", "v"], [["f", ["control"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.US", non_shifted(), null, ["EM1L"]),
    keydef("(シンクロ) あ, い, 左 → ・未確定", ["j", "k", "t"], ["slash"], non_shifted(), false, ["EM1L"]),
    delayed("(U.S.使用)(JIS/US)(シンクロ) あ, い, (っ) → ↲「」", ["j", "k", "g"], ["lang1", ["e", ["control"]], "return_or_enter", "close_bracket", "non_us_pound", "return_or_enter", ["b", ["control"]]], "com.apple.keylayout.US", non_shifted(null, true, false), false, ["EM1L"]),
    delayed("", ["j", "k", "g"], ["lang1", ["e", ["control"]], "return_or_enter", "open_bracket", "close_bracket", "return_or_enter", ["b", ["control"]]], "com.apple.keylayout.US", non_shifted(), false, ["EM1L"]),
    delayed("(U.S.使用)(シンクロ) あ, い, そ → ↲□", ["j", "k", "b"], ["lang1", ["e", ["control"]], "return_or_enter", "spacebar"], "com.apple.keylayout.US", non_shifted(), null, ["EM1L"]),
    keydef("(シンクロ) と, か, 右 → Home", ["d", "f", "y"], [["a", ["control"]]], non_shifted(), false, ["EM1R"]),
    delayed("(U.S.使用)(シンクロ) と, か, く → 確定End", ["d", "f", "h"], [["e", ["control"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.US", non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, た → End", ["d", "f", "n"], [["e", ["control"]]], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, BS → 文末消去", ["d", "f", "u"], [["k", ["control"]]], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, あ → ↑", ["d", "f", "j"], [["b", ["control"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, な → ↓", ["d", "f", "m"], [["f", ["control"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, る → 再", ["d", "f", "i"], ["lang1", "lang1"], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, い → +↑", ["d", "f", "k"], [["b", ["shift","control"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, ん → +↓", ["d", "f", "comma"], [["f", ["shift","control"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, す → Del", ["d", "f", "o"], ["delete_forward"], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, う → +7↑", ["d", "f", "l"], [["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, ら → +7↓", ["d", "f", "period"], [["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, へ → 入力キャンセル", ["d", "f", "p"], ["escape", "escape", "escape"], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, ー → カタカナ変換", ["d", "f", "semicolon"], ["f7"], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, れ → ひらがな変換", ["d", "f", "slash"], ["f6"], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) な, ん, 小 → カッコ外し", ["m", "comma", "q"], [["x", ["command"]], "delete_or_backspace", "delete_forward", ["v", ["command"]]], non_shifted(), false, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, ろ → 《》", ["m", "comma", "a"], [["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["a", ["option"]], ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["b", ["option"]], ["b", ["control"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, ほ → ｜《》", ["m", "comma", "z"], 
      [
        ["f", ["option"]], ["f", ["option"]], ["5", ["option"]], ["c", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["a", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["b", ["option"]],
        ["b", ["control"]], ["b", ["control"]], ["v", ["command"]], ["f", ["control"]],
        "spacebar", ["b", ["shift", "control"]], ["x", ["command"]], ["lang1", ["shift"]],
        "lang1"
      ],
      "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"], true),
    keydef("(日本語IM時)(JIS/US)(シンクロ) な, ん, き → +『』", ["m", "comma", "w"], [["x", ["command"]], ["close_bracket", ["shift"]], ["v", ["command"]], ["non_us_pound", ["shift"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted(null, true, true), false, ["EM2L"]),
    keydef("", ["m", "comma", "w"], [["x", ["command"]], ["open_bracket", ["shift"]], ["v", ["command"]], ["close_bracket", ["shift"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted(null, false, true), false, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, き → +『』", ["m", "comma", "w"], 
      [
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["e", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["f", ["option"]],
        ["b", ["control"]], ["v", ["command"]], ["f", ["control"]], "spacebar",
        ["b", ["shift", "control"]], ["x", ["command"]], ["lang1", ["shift"]], "lang1"
      ],
      "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"], true),
    keydef("(JIS/US)(シンクロ) な, ん, け → +（）", ["m", "comma", "s"], [["x", ["command"]], ["8", ["shift"]], ["v", ["command"]], ["9", ["shift"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted(null, true, false), false, ["EM2L"]),
    keydef("", ["m", "comma", "s"], [["x", ["command"]], ["9", ["shift"]], ["v", ["command"]], ["0", ["shift"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted(), false, ["EM2L"]),
    keydef("(日本語IM時)(JIS/US)(シンクロ) な, ん, ひ → +【】", ["m", "comma", "x"], [["x", ["command"]], ["8", ["option"]], ["v", ["command"]], ["9", ["option"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted(null, true, true), false, ["EM2L"]),
    keydef("", ["m", "comma", "x"], [["x", ["command"]], ["9", ["option"]], ["v", ["command"]], ["0", ["option"]], "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted(null, false, true), false, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, ひ → +【】", ["m", "comma", "x"], 
      [
        ["3", ["option"]], ["0", ["option"]], ["1", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["1", ["option"]], ["1", ["option"]],
        ["b", ["control"]], ["v", ["command"]], ["f", ["control"]], "spacebar",
        ["b", ["shift", "control"]], ["x", ["command"]], ["lang1", ["shift"]], "lang1"
      ],
      "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"], true),
    keydef("(シンクロ) な, ん, て → 行頭□□□挿入", ["m", "comma", "e"], [["a", ["control"]], "return_or_enter", "spacebar", "spacebar", "spacebar", ["e", ["control"]]], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, と → □□□", ["m", "comma", "d"], ["spacebar", "spacebar", "spacebar"], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, は → 行頭□□□戻し", ["m", "comma", "c"], [["a", ["control"]], "delete_or_backspace", "delete_forward", "delete_forward", "delete_forward", ["e", ["control"]]], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, し → 行頭□挿入", ["m", "comma", "r"], [["a", ["control"]], "return_or_enter", "spacebar", ["e", ["control"]]], non_shifted(), false, ["EM2L"]),
    keydef("(JIS/US)(シンクロ) な, ん, か → +「」", ["m", "comma", "f"], [["x", ["command"]], "close_bracket", ["v", ["command"]], "non_us_pound", "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted(null, true, false), false, ["EM2L"]),
    keydef("", ["m", "comma", "f"], [["x", ["command"]], "open_bracket", ["v", ["command"]], "close_bracket", "return_or_enter", "spacebar", ["b", ["shift","control"]], ["x", ["command"]]], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, こ → 行頭□戻し", ["m", "comma", "v"], [["a", ["control"]], "delete_or_backspace", "delete_forward", ["e", ["control"]]], non_shifted(), false, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, 左 → ○", ["m", "comma", "t"], [["2", ["option"]], ["5", ["option"]], ["c", ["option"]], ["b", ["option"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    keydef("(シンクロ) な, ん, (っ) → ／", ["m", "comma", "g"], [["slash", ["option"]], "return_or_enter"], non_shifted(), false, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, そ → x   x   x", ["m", "comma", "b"], 
      [["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["0", ["option"]], ["0", ["option"]], ["d", ["option"]], ["7", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["0", ["option"]], ["0", ["option"]], ["d", ["option"]], ["7", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["0", ["option"]], ["0", ["option"]], ["d", ["option"]], ["7", ["option"]],
        ["lang1", ["shift"]], "lang1", "return_or_enter"],
        "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    keydef("(シンクロ) は, こ, 右 → +Home", ["c", "v", "y"], [["a", ["shift","control"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, く → Copy", ["c", "v", "h"], [["c", ["command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, た → +End", ["c", "v", "n"], [["e", ["shift","control"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, BS → Cut", ["c", "v", "u"], [["x", ["command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, あ → →5", ["c", "v", "j"], [["p", ["control"]], ["p", ["control"]], ["p", ["control"]], ["p", ["control"]], ["p", ["control"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, な → ←5", ["c", "v", "m"], [["n", ["control"]], ["n", ["control"]], ["n", ["control"]], ["n", ["control"]], ["n", ["control"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, る → Paste", ["c", "v", "i"], [["v", ["command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, い → +→5", ["c", "v", "k"], [["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, ん → +←5", ["c", "v", "comma"], [["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, す → Redo", ["c", "v", "o"], [["z", ["shift","command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, う → +→20", ["c", "v", "l"], [["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]], ["p", ["shift","control"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, ら → +←20", ["c", "v", "period"], [["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]], ["n", ["shift","control"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, へ → Undo", ["c", "v", "p"], [["z", ["command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, ー → 一行前選択", ["c", "v", "semicolon"], [["p", ["control","shift"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, れ → 一行後選択", ["c", "v", "slash"], [["n", ["control","shift"]]], non_shifted(), null, ["EM2R"]),
    
    keydef("(シンクロ) 右濁, し, や → じゃ", ["j", "r", "h"], ["j", "a"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, し, ゆ → じゅ", ["j", "r", "p"], ["j", "u"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, し, よ → じょ", ["j", "r", "i"], ["j", "o"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, き, や → ぎゃ", ["j", "w", "h"], ["g", "y", "a"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, き, ゆ → ぎゅ", ["j", "w", "p"], ["g", "y", "u"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, き, よ → ぎょ", ["j", "w", "i"], ["g", "y", "o"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, ち, や → ぢゃ", ["j", "g", "h"], ["d", "y", "a"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, ち, ゆ → ぢゅ", ["j", "g", "p"], ["d", "y", "u"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, ち, よ → ぢょ", ["j", "g", "i"], ["d", "y", "o"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, ひ, や → びゃ", ["j", "x", "h"], ["b", "y", "a"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, ひ, ゆ → びゅ", ["j", "x", "p"], ["b", "y", "u"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, ひ, よ → びょ", ["j", "x", "i"], ["b", "y", "o"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右半, ひ, や → ぴゃ", ["m", "x", "h"], ["p", "y", "a"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右半, ひ, ゆ → ぴゅ", ["m", "x", "p"], ["p", "y", "u"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右半, ひ, よ → ぴょ", ["m", "x", "i"], ["p", "y", "o"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右半, て, い → てぃ", ["m", "e", "k"], ["t", "h", "i"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右半, て, ゆ → てゅ", ["m", "e", "p"], ["t", "h", "u"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右濁, て, い → でぃ", ["j", "e", "k"], ["d", "h", "i"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, て, ゆ → でゅ", ["j", "e", "p"], ["d", "h", "u"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右半, と, う → とぅ", ["m", "d", "l"], ["t", "w", "u"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右濁, と, う → どぅ", ["j", "d", "l"], ["d", "w", "u"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右半, し, え → しぇ", ["m", "r", "o"], ["s", "y", "e"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右半, ち, え → ちぇ", ["m", "g", "o"], ["t", "y", "e"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右濁, し, え → じぇ", ["j", "r", "o"], ["j", "e"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, ち, え → ぢぇ", ["j", "g", "o"], ["d", "y", "e"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 左濁, う, あ → ヴぁ", ["f", "l", "j"], ["v", "a"], non_shifted(), false, ["DR", "DL"]),
    keydef("(シンクロ) 左濁, う, い → ヴぃ", ["f", "l", "k"], ["v", "i"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, う, え → ヴぇ", ["f", "l", "o"], ["v", "e"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, う, お → ヴぉ", ["f", "l", "n"], ["v", "o"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, う, ゆ → ヴゅ", ["f", "l", "p"], ["v", "y", "u"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, う, ー → ヴ",   ["f", "l", "semicolon"], ["v", "u"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左半, う, い → うぃ", ["v", "l", "k"], ["w", "i"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, う, え → うぇ", ["v", "l", "o"], ["w", "e"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, う, お → うぉ", ["v", "l", "n"], ["w", "h", "o"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, い, え → いぇ", ["v", "k", "o"], ["y", "e"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, く, あ → くぁ", ["v", "h", "j"], ["q", "a"], non_shifted(), false, ["HR", "DL"]),
    keydef("(シンクロ) 左半, く, い → くぃ", ["v", "h", "k"], ["q", "i"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, く, え → くぇ", ["v", "h", "o"], ["q", "e"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, く, お → くぉ", ["v", "h", "n"], ["q", "o"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, く, わ → くゎ", ["v", "h", "l"], ["k", "u", "x", "w", "a"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左濁, く, あ → ぐぁ", ["f", "h", "j"], ["g", "w", "a"], non_shifted(), false, ["DR", "DL"]),
    keydef("(シンクロ) 左濁, く, い → ぐぃ", ["f", "h", "k"], ["g", "w", "i"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, く, え → ぐぇ", ["f", "h", "o"], ["g", "w", "e"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, く, お → ぐぉ", ["f", "h", "n"], ["g", "w", "o"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, く, わ → ぐゎ", ["f", "h", "l"], ["g", "u", "x", "w", "a"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左半, ふ, あ → ふぁ", ["v", "semicolon", "j"], ["f", "a"], non_shifted(), false, ["HR", "DL"]),
    keydef("(シンクロ) 左半, ふ, い → ふぃ", ["v", "semicolon", "k"], ["f", "i"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, ふ, え → ふぇ", ["v", "semicolon", "o"], ["f", "e"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, ふ, お → ふぉ", ["v", "semicolon", "n"], ["f", "o"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 左半, ふ, ゆ → ふゅ", ["v", "semicolon", "p"], ["f", "u", "x", "y", "u"], non_shifted(), false, ["HR"]),
    
    keydef("[右濁] (シンクロ) し, や → じゃ", ["r", "h"], ["j", "a"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) し, ゆ → じゅ", ["r", "p"], ["j", "u"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) し, よ → じょ", ["r", "i"], ["j", "o"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) き, や → ぎゃ", ["w", "h"], ["g", "y", "a"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) き, ゆ → ぎゅ", ["w", "p"], ["g", "y", "u"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) き, よ → ぎょ", ["w", "i"], ["g", "y", "o"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) ち, や → ぢゃ", ["g", "h"], ["d", "y", "a"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) ち, ゆ → ぢゅ", ["g", "p"], ["d", "y", "u"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) ち, よ → ぢょ", ["g", "i"], ["d", "y", "o"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) ひ, や → びゃ", ["x", "h"], ["b", "y", "a"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) ひ, ゆ → びゅ", ["x", "p"], ["b", "y", "u"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) ひ, よ → びょ", ["x", "i"], ["b", "y", "o"], non_shifted("DL"), false),
    keydef("[右半] (シンクロ) ひ, や → ぴゃ", ["x", "h"], ["p", "y", "a"], non_shifted("HL"), false),
    keydef("[右半] (シンクロ) ひ, ゆ → ぴゅ", ["x", "p"], ["p", "y", "u"], non_shifted("HL"), false),
    keydef("[右半] (シンクロ) ひ, よ → ぴょ", ["x", "i"], ["p", "y", "o"], non_shifted("HL"), false),
    keydef("[右半] (シンクロ) て, い → てぃ", ["e", "k"], ["t", "h", "i"], non_shifted("HL"), false),
    keydef("[右半] (シンクロ) て, ゆ → てゅ", ["e", "p"], ["t", "h", "u"], non_shifted("HL"), false),
    keydef("[右濁] (シンクロ) て, い → でぃ", ["e", "k"], ["d", "h", "i"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) て, ゆ → でゅ", ["e", "p"], ["d", "h", "u"], non_shifted("DL"), false),
    keydef("[右半] (シンクロ) と, う → とぅ", ["d", "l"], ["t", "w", "u"], non_shifted("HL"), false),
    keydef("[右濁] (シンクロ) と, う → どぅ", ["d", "l"], ["d", "w", "u"], non_shifted("DL"), false),
    keydef("[右半] (シンクロ) し, え → しぇ", ["r", "o"], ["s", "y", "e"], non_shifted("HL"), false),
    keydef("[右半] (シンクロ) ち, え → ちぇ", ["g", "o"], ["t", "y", "e"], non_shifted("HL"), false),
    keydef("[右濁] (シンクロ) し, え → じぇ", ["r", "o"], ["j", "e"], non_shifted("DL"), false),
    keydef("[右濁] (シンクロ) ち, え → ぢぇ", ["g", "o"], ["d", "y", "e"], non_shifted("DL"), false),
    keydef("[左濁] (シンクロ) う, あ → ヴぁ", ["l", "j"], ["v", "a"], non_shifted("DR"), false, ["DL"]),
    keydef("[左濁] (シンクロ) う, い → ヴぃ", ["l", "k"], ["v", "i"], non_shifted("DR"), false),
    keydef("[左濁] (シンクロ) う, え → ヴぇ", ["l", "o"], ["v", "e"], non_shifted("DR"), false),
    keydef("[左濁] (シンクロ) う, お → ヴぉ", ["l", "n"], ["v", "o"], non_shifted("DR"), false),
    keydef("[左濁] (シンクロ) う, ゆ → ヴゅ", ["l", "p"], ["v", "y", "u"], non_shifted("DR"), false),
    keydef("[左半] (シンクロ) う, い → うぃ", ["l", "k"], ["w", "i"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) う, え → うぇ", ["l", "o"], ["w", "e"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) う, お → うぉ", ["l", "n"], ["w", "h", "o"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) い, え → いぇ", ["k", "o"], ["y", "e"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) く, あ → くぁ", ["h", "j"], ["q", "a"], non_shifted("HR"), false, ["DL"]),
    keydef("[左半] (シンクロ) く, い → くぃ", ["h", "k"], ["q", "i"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) く, え → くぇ", ["h", "o"], ["q", "e"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) く, お → くぉ", ["h", "n"], ["q", "o"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) く, わ → くゎ", ["h", "l"], ["k", "u", "x", "w", "a"], non_shifted("HR"), false),
    keydef("[左濁] (シンクロ) く, あ → ぐぁ", ["h", "j"], ["g", "w", "a"], non_shifted("DR"), false, ["DL"]),
    keydef("[左濁] (シンクロ) く, い → ぐぃ", ["h", "k"], ["g", "w", "i"], non_shifted("DR"), false),
    keydef("[左濁] (シンクロ) く, え → ぐぇ", ["h", "o"], ["g", "w", "e"], non_shifted("DR"), false),
    keydef("[左濁] (シンクロ) く, お → ぐぉ", ["h", "n"], ["g", "w", "o"], non_shifted("DR"), false),
    keydef("[左濁] (シンクロ) く, わ → ぐゎ", ["h", "l"], ["g", "u", "x", "w", "a"], non_shifted("DR"), false),
    keydef("[左半] (シンクロ) ー, あ → ふぁ", ["semicolon", "j"], ["f", "a"], non_shifted("HR"), false, ["DL"]),
    keydef("[左半] (シンクロ) ー, い → ふぃ", ["semicolon", "k"], ["f", "i"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) ー, え → ふぇ", ["semicolon", "o"], ["f", "e"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) ー, お → ふぉ", ["semicolon", "n"], ["f", "o"], non_shifted("HR"), false),
    keydef("[左半] (シンクロ) ー, ゆ → ふゅ", ["semicolon", "p"], ["f", "u", "x", "y", "u"], non_shifted("HR"), false),
    
    keydef("(シンクロ) 左濁, さ → ざ", ["f", "u"], ["z", "a"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, す → ず", ["f", "o"], ["z", "u"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, く → ぐ", ["f", "h"], ["g", "u"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, つ → づ", ["f", "l"], ["d", "u"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, ふ → ぶ", ["f", "semicolon"], ["b", "u"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左半濁, ふ → ぷ", ["v", "semicolon"], ["p", "u"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, た → だ", ["f", "n"], ["d", "a"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 左濁, へ → べ", ["f", "p"], ["b", "e"], non_shifted(), false, ["DR"]),
    keydef("(シンクロ) 右濁, け → げ", ["j", "s"], ["g", "e"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, て → で", ["j", "e"], ["d", "e"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, し → じ", ["j", "r"], ["z", "i"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, せ → ぜ", ["j", "a"], ["z", "e"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, き → ぎ", ["j", "w"], ["g", "i"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, と → ど", ["j", "d"], ["d", "o"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, か → が", ["j", "f"], ["g", "a"], non_shifted(), false, ["DL", "DR"]),
    keydef("(シンクロ) 右濁, ち → ぢ", ["j", "g"], ["d", "i"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, ほ → ぼ", ["j", "z"], ["b", "o"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, ひ → び", ["j", "x"], ["b", "i"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, は → ば", ["j", "c"], ["b", "a"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, こ → ご", ["j", "v"], ["g", "o"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 右濁, そ → ぞ", ["j", "b"], ["z", "o"], non_shifted(), false, ["DL"]),
    keydef("(シンクロ) 左半, へ → ぺ", ["v", "p"], ["p", "e"], non_shifted(), false, ["HR"]),
    keydef("(シンクロ) 右半, ほ → ぽ", ["m", "z"], ["p", "o"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右半, ひ → ぴ", ["m", "x"], ["p", "i"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) 右半, は → ぱ", ["m", "c"], ["p", "a"], non_shifted(), false, ["HL"]),
    keydef("(シンクロ) む, や → みゃ", ["s", "h"], ["m", "y", "a"], non_shifted(), false),
    keydef("(シンクロ) む, ゆ → みゅ", ["s", "p"], ["m", "y", "u"], non_shifted(), false),
    keydef("(シンクロ) む, よ → みょ", ["s", "i"], ["m", "y", "o"], non_shifted(), false),
    keydef("(シンクロ) り, や → りゃ", ["e", "h"], ["r", "y", "a"], non_shifted(), false),
    keydef("(シンクロ) り, ゆ → りゅ", ["e", "p"], ["r", "y", "u"], non_shifted(), false),
    keydef("(シンクロ) り, よ → りょ", ["e", "i"], ["r", "y", "o"], non_shifted(), false),
    keydef("(シンクロ) し, や → しゃ", ["r", "h"], ["s", "y", "a"], non_shifted(), false),
    keydef("(シンクロ) し, ゆ → しゅ", ["r", "p"], ["s", "y", "u"], non_shifted(), false),
    keydef("(シンクロ) し, よ → しょ", ["r", "i"], ["s", "y", "o"], non_shifted(), false),
    keydef("(シンクロ) き, や → きゃ", ["w", "h"], ["k", "y", "a"], non_shifted(), false),
    keydef("(シンクロ) き, ゆ → きゅ", ["w", "p"], ["k", "y", "u"], non_shifted(), false),
    keydef("(シンクロ) き, よ → きょ", ["w", "i"], ["k", "y", "o"], non_shifted(), false),
    keydef("(シンクロ) に, や → にゃ", ["d", "h"], ["n", "y", "a"], non_shifted(), false),
    keydef("(シンクロ) に, ゆ → にゅ", ["d", "p"], ["n", "y", "u"], non_shifted(), false),
    keydef("(シンクロ) に, よ → にょ", ["d", "i"], ["n", "y", "o"], non_shifted(), false),
    keydef("(シンクロ) ち, や → ちゃ", ["g", "h"], ["t", "y", "a"], non_shifted(), false),
    keydef("(シンクロ) ち, ゆ → ちゅ", ["g", "p"], ["t", "y", "u"], non_shifted(), false),
    keydef("(シンクロ) ち, よ → ちょ", ["g", "i"], ["t", "y", "o"], non_shifted(), false),
    keydef("(シンクロ) ひ, や → ひゃ", ["x", "h"], ["h", "y", "a"], non_shifted(), false),
    keydef("(シンクロ) ひ, ゆ → ひゅ", ["x", "p"], ["h", "y", "u"], non_shifted(), false),
    keydef("(シンクロ) ひ, よ → ひょ", ["x", "i"], ["h", "y", "o"], non_shifted(), false),
    
    keydef("(シンクロ) 小, や → (ゃ)", ["q", "h"], ["x", "y", "a"], japanese_input(), false, ["KO"]),
    keydef("(シンクロ) 小, ゆ → (ゅ)", ["q", "p"], ["x", "y", "u"], japanese_input(), false, ["KO"]),
    keydef("(シンクロ) 小, よ → (ょ)", ["q", "i"], ["x", "y", "o"], japanese_input(), false, ["KO"]),
    keydef("(シンクロ) 小, あ → (ぁ)", ["q", "j"], ["x", "a"], japanese_input(), false, ["KO"]),
    keydef("(シンクロ) 小, い → (ぃ)", ["q", "k"], ["x", "i"], japanese_input(), false, ["KO"]),
    keydef("(シンクロ) 小, わ → (ゎ)", ["q", "period"], ["x", "w", "a"], japanese_input(), false, ["KO"]),
    keydef("(シンクロ) 小, う → (ぅ)", ["q", "l"], ["x", "u"], japanese_input(), false, ["KO"]),
    keydef("(シンクロ) 小, え → (ぇ)", ["q", "o"], ["x", "e"], japanese_input(), false, ["KO"]),
    keydef("(シンクロ) 小, お → (ぉ)", ["q", "n"], ["x", "o"], japanese_input(), false, ["KO"]),
    keydef("(シンクロ) く, あ → IME ON", ["h", "j"], ["lang1"], [{"type": "variable_unless", "name": "shifted", "value": true}], false),
    keydef("(シンクロ) か, (っ) → IME OFF", ["f", "g"], ["lang2"], [{"type": "variable_unless", "name": "shifted", "value": true}], false),
    keydef("(シンクロ) こ, な → 行送り", ["v", "m"], ["return_or_enter"], japanese_input(), false, ["HL", "HR"]),
    {
      "description": "[Sp] スペースキー",
      "type": "basic",
      "conditions": shifted(),
      "from": {"key_code": "spacebar", "modifiers": {"mandatory": ["shift"]}},
      "to": [{"key_code": "spacebar", "modifiers": ["shift"]}
      ]
    },
    {
      "description": "スペースキー",
      "type": "basic",
      "conditions": japanese_input(),
      "from": {"key_code": "spacebar"},
      "to": [{"set_variable": {"name": "shifted", "value":true}}],
      "to_if_alone": [{"key_code": "spacebar"}],
      "to_after_key_up": [{"set_variable": {"name": "shifted", "value": false}}]
    },
    
    delayed("[あ, い] 小 → 新", "q", [["left_arrow", ["command"]], ["down_arrow", ["command"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.US", non_shifted("EM1L"), null),
    keydef("[あ, い] ろ → ……", "a", [["semicolon", ["option"]], ["semicolon", ["option"]], "return_or_enter"], non_shifted("EM1L"), false),
    delayed("(UNICODE使用)[あ, い] ほ → ──", "z", [["2", ["option"]], ["5", ["option"]], ["0", ["option"]], ["2", ["option"]], ["2", ["option"]], ["5", ["option"]], ["0", ["option"]], ["2", ["option"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted("EM1L"), null),
    keydef("(日本語IM時)(JIS/US)[あ, い] き → 『』", "w", [["close_bracket", ["shift"]], ["non_us_pound", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", true, true), false),
    keydef("", "w", [["open_bracket", ["shift"]], ["close_bracket", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", false, true), false),
    delayed("(UNICODE使用)[あ, い] き → 『』", "w", [["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["e", ["option"]], ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["f", ["option"]], ["b", ["control"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted("EM1L"), null),
    keydef("(JIS/US)[あ, い] け → （）", "s", [["8", ["shift"]], ["9", ["shift"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", true)),
    keydef("", "s", [["9", ["shift"]], ["0", ["shift"]], "return_or_enter", ["b", ["control"]]],  non_shifted("EM1L"), false),
    keydef("(日本語IM時)(JIS/US)[あ, い] ひ → 【】", "x", [["8", ["option"]], ["9", ["option"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", true, true), false),
    keydef("", "x", [["9", ["option"]], ["0", ["option"]], "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", false, true), false),
    delayed("(UNICODE使用)[あ, い] ひ → 【】", "x", [["3", ["option"]], ["0", ["option"]], ["1", ["option"]], ["0", ["option"]], ["3", ["option"]], ["0", ["option"]], ["1", ["option"]], ["1", ["option"]], ["b", ["control"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted("EM1L"), null),
    keydef("[あ, い] と → ？", "d", [["slash", ["shift"]], "return_or_enter"], non_shifted("EM1L"), false),
    keydef("[あ, い] は → ！", "c", [["1", ["shift"]], "return_or_enter"], non_shifted("EM1L"), false),
    keydef("[あ, い] し → 保", "r", [["s", ["command"]]], non_shifted("EM1L"), false),
    keydef("(JIS/US)[あ, い] か → 「」", "f", ["close_bracket", "non_us_pound", "return_or_enter", ["b", ["control"]]], non_shifted("EM1L", true), false),
    keydef("", "f", ["open_bracket", "close_bracket", "return_or_enter", ["b", ["control"]]], non_shifted("EM1L"), false),
    delayed("(U.S.使用)[あ, い] こ → 確定↓", "v", [["f", ["control"]], ["lang1", ["shift"]], "lang1",], "com.apple.keylayout.US", non_shifted("EM1L"), null),
    keydef("[あ, い] 左 → ・未確定", "t", ["slash"], non_shifted("EM1L")),
    delayed("(U.S.使用)(JIS/US)[あ, い] (っ) → ↲「」", "g", ["lang1", ["e", ["control"]], "return_or_enter", "close_bracket", "non_us_pound", "return_or_enter", ["b", ["control"]]], "com.apple.keylayout.US", non_shifted("EM1L", true), null),
    delayed("", "g", ["lang1", ["e", ["control"]], "return_or_enter", "open_bracket", "close_bracket", "return_or_enter", ["b", ["control"]]], "com.apple.keylayout.US", non_shifted("EM1L"), null),
    delayed("(U.S.使用)[あ, い] そ → ↲□", "b", ["lang1", ["e", ["control"]], "return_or_enter", "spacebar"], "com.apple.keylayout.US", non_shifted("EM1L"), null),
    keydef("[と, か] 右 → Home", "y", [["a", ["control"]]], non_shifted("EM1R"), false),
    delayed("(U.S.使用)[と, か] く → 確定End", "h", [["e", ["control"]], ["lang1", ["shift"]], "lang1",], "com.apple.keylayout.US", non_shifted("EM1R"), null),
    keydef("[と, か] た → End", "n", [["e", ["control"]]], non_shifted("EM1R"), false),
    keydef("[と, か] BS → 文末消去", "u", [["k", ["control"]]], non_shifted("EM1R"), false),
    keydef("[と, か] あ → ↑", "j", [["b", ["control"]]], non_shifted("EM1R")),
    keydef("[と, か] な → ↓", "m", [["f", ["control"]]], non_shifted("EM1R")),
    keydef("[と, か] る → 再", "i", ["lang1", "lang1"], non_shifted("EM1R")),
    keydef("[と, か] い → +↑", "k", [["b", ["shift","control"]]], non_shifted("EM1R")),
    keydef("[と, か] ん → +↓", "comma", [["f", ["shift","control"]]], non_shifted("EM1R")),
    keydef("[と, か] す → Del", "o", ["delete_forward"], non_shifted("EM1R")),
    keydef("[と, か] う → +7↑", "l", [["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]], ["b", ["shift","control"]]], non_shifted("EM1R")),
    keydef("[と, か] ら → +7↓", "period", [["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]], ["f", ["shift","control"]]], non_shifted("EM1R")),
    keydef("[と, か] へ → 入力キャンセル", "p", ["escape", "escape", "escape"], non_shifted("EM1R")),
    keydef("[と, か] ー → カタカナ変換", "semicolon", ["f7"], non_shifted("EM1R")),
    keydef("[と, か] れ → ひらがな変換", "slash", ["f6"], non_shifted("EM1R")),
    delayed("(UNICODE使用)[な, ん] ろ → 《》", "a", [["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["a", ["option"]], ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["b", ["option"]], ["b", ["control"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    keydef("[な, ん] て → 行頭□□□挿入", "e", [["a", ["control"]], "return_or_enter", "spacebar", "spacebar", "spacebar", ["e", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] と → □□□", "d", ["spacebar", "spacebar", "spacebar"], non_shifted("EM2L")),
    keydef("[な, ん] は → 行頭□□□戻し", "c", [["a", ["control"]], "delete_or_backspace", "delete_forward", "delete_forward", "delete_forward", ["e", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] し → 行頭□挿入", "r", [["a", ["control"]], "return_or_enter", "spacebar", ["e", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] こ → 行頭□戻し", "v", [["a", ["control"]], "delete_or_backspace", "delete_forward", ["e", ["control"]]], non_shifted("EM2L"), false),
    delayed("(UNICODE使用)[な, ん] 左 → ○", "t", [["2", ["option"]], ["5", ["option"]], ["c", ["option"]], ["b", ["option"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    keydef("[な, ん] (っ) → ／", "g", [["slash", ["option"]], "return_or_enter"], non_shifted("EM2L"), false),
    delayed("(UNICODE使用)[な, ん] そ → x   x   x", "b", 
      [
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["0", ["option"]], ["0", ["option"]], ["d", ["option"]], ["7", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["0", ["option"]], ["0", ["option"]], ["d", ["option"]], ["7", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["3", ["option"]], ["0", ["option"]], ["0", ["option"]], ["0", ["option"]],
        ["0", ["option"]], ["0", ["option"]], ["d", ["option"]], ["7", ["option"]],
        ["lang1", ["shift"]], "lang1", "return_or_enter"
      ],
      "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
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
    keydef("[小] う → (ゎ)", "period", ["x", "w", "a"], japanese_input("KO")),
    keydef("[小] う → (ぅ)", "l", ["x", "u"], japanese_input("KO")),
    keydef("[小] え → (ぇ)", "o", ["x", "e"], japanese_input("KO")),
    keydef("[小] お → (ぉ)", "n", ["x", "o"], japanese_input("KO")),
    keydef("[こ] な → 行送り", "m", ["return_or_enter"], japanese_input("HR")),
    keydef("[な] こ → 行送り", "v", ["return_or_enter"], japanese_input("HL")),
    
    keydef("[Sp] ぬ", "w", ["n", "u"], shifted()),
    keydef("[Sp] り", "e", ["r", "i"], shifted()),
    keydef("[Sp] め", "r", ["m", "e"], shifted()),
    keydef("[Sp] 左", "t", [["n", ["control","shift"]]], shifted()),
    keydef("[Sp] 右", "y", [["p", ["control","shift"]]], shifted()),
    keydef("[Sp] さ", "u", ["s", "a"], shifted()),
    keydef("[Sp] よ", "i", ["y", "o"], shifted()),
    keydef("[Sp] え", "o", ["e"], shifted()),
    keydef("[Sp] ゆ", "p", ["y", "u"], shifted()),
    keydef("[Sp] せ", "a", ["s", "e"], shifted()),
    keydef("[Sp] み", "s", ["m", "i"], shifted()),
    keydef("[Sp] に", "d", ["n", "i"], shifted()),
    keydef("[Sp] ま", "f", ["m", "a"], shifted(), false, ["DR"], null, true),
    keydef("[Sp] ち", "g", ["t", "i"], shifted()),
    keydef("[Sp] や", "h", ["y", "a"], shifted()),
    keydef("[Sp] の", "j", ["n", "o"], shifted(), false, ["DL"], null, true),
    keydef("[Sp] も", "k", ["m", "o"], shifted()),
    keydef("[Sp] つ", "l", ["t", "u"], shifted()),
    keydef("[Sp] ふ", "semicolon", ["f", "u"], shifted()),
    keydef("[Sp] を", "c", ["w", "o"], shifted()),
    keydef("[Sp] 、", "v", ["comma"], shifted()),
    keydef("[Sp] む", "b", ["m", "u"], shifted()),
    keydef("[Sp] お", "n", ["o"], shifted()),
    keydef("[Sp] 。", "m", ["period", "return_or_enter"], shifted()),
    keydef("[Sp] ね", "comma", ["n", "e"], shifted()),
    keydef("[Sp] わ", "period", ["w", "a"], shifted()),
    
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
    keydef("左シフトキー", "left_shift", ["left_shift"], japanese_input(), null, ["shifted"], null, true),
    keydef("右シフトキー", "right_shift", ["right_shift"], japanese_input(), null, ["shifted"], null, true),
    keydef("[Sp] ぬ", "w", ["n", "u"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] り", "e", ["r", "i"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] め", "r", ["m", "e"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] 左", "t", [["n", ["control","shift"]]], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] 右", "y", [["p", ["control","shift"]]], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] さ", "u", ["s", "a"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] よ", "i", ["y", "o"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] え", "o", ["e"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] ゆ", "p", ["y", "u"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] せ", "a", ["s", "e"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] み", "s", ["m", "i"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] に", "d", ["n", "i"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] ま", "f", ["m", "a"], japanese_input(), false, ["DR"], null, true, ["shift"]),
    keydef("[Sp] ち", "g", ["t", "i"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] や", "h", ["y", "a"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] の", "j", ["n", "o"], japanese_input(), false, ["DL"], null, true, ["shift"]),
    keydef("[Sp] も", "k", ["m", "o"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] つ", "l", ["t", "u"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] ふ", "semicolon", ["f", "u"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] を", "c", ["w", "o"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] 、", "v", ["comma"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] む", "b", ["m", "u"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] お", "n", ["o"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] 。", "m", ["period", "return_or_enter"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] ね", "comma", ["n", "e"], japanese_input(), false, null, null, null, ["shift"]),
    keydef("[Sp] わ", "period", ["w", "a"], japanese_input(), false, null, null, null, ["shift"])
  ]
}

function manipulatorsC2() {
  return [
    {
      "description": "エンターキー",
      "type": "basic",
      "conditions": japanese_input(),
      "from": {"key_code": "return_or_enter"},
      "to": [{"set_variable": {"name": "shifted", "value": true}}],
      "to_if_alone": [{"key_code": "return_or_enter"}],
      "to_after_key_up": [{"set_variable": {"name": "shifted", "value": false}}]
    }
  ]
}

function main() {
  console.log(
    JSON.stringify(
      {
        "title":"Key layout for Japanese \"薙刀式\" 16",
        "rules":[
          {
            "description":"A1: 同時連続シフト拡張",
            "manipulators": manipulatorsA1()
          },
          {
            "description":"A2: 編集モード簡便化: 未動作",
            "manipulators": manipulatorsA2()
          },
          {
            "description":"B: 本体",
            "manipulators": manipulatorsB()
          },
          {
            "description":"C1: 左右シフトかな拡張",
            "manipulators": manipulatorsC1()
          },
          {
            "description":"C2: エンター同時押しシフト拡張",
            "manipulators": manipulatorsC2()
          }
        ]
      }, null, '  '
    )
  )
}

main()
