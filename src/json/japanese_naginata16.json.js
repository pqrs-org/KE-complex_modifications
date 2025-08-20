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
function keydef(description, from_key, to_key_list, conditions, will_repeat, transmit_var_list, threshold,
                to_after_key_up_var, mondatory_modifiers_list)
{
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
  var afterKU = [{"set_variable": {"name": "command", "type": "unset"}}];
  if (to_after_key_up_var) {
    for (var i=0; i<transmit_var_list.length; i++) {
      afterKU.push({"set_variable": {"name": transmit_var_list[i], "value": false}});
    }
  }
  output.to_after_key_up = afterKU;
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

//
// CONDITIONS
//
function japanese_input(var_name) {
  var jpn_body = [
    {
      "input_sources": [{"language": "ja"}],
      "type": "input_source_if"
    },
    {
      "input_sources": [{"input_mode_id": "Roman$"}],
      "type":"input_source_unless"
    },
    {
      "type": "variable_unless",
      "name": "command",
      "value": true
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

function non_shifted(var_name, is_jis_keyboard, im) {
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
  if (im != "undefined" && im != null) {
    if (im == "all" || im == "any") {
      non_shifted_body = [].concat(
        {
          "input_sources":[{"input_source_id": "Kotoeri"}, {"input_source_id": "atok"}],
          "type":"input_source_if"
        },
        non_shifted_body
      );
    } else if (im == "kotoeri") {
        non_shifted_body = [].concat(
        {
          "input_sources":[{"input_source_id": "Kotoeri"}],
          "type":"input_source_if"
        },
        non_shifted_body
      );
    } else if (im == "atok") {
        non_shifted_body = [].concat(
        {
          "input_sources":[{"input_source_id": "atok"}],
          "type":"input_source_if"
        },
        non_shifted_body
      );
    }

  }
  return non_shifted_body;
}

//
// OTHER HELPER FUNCTIONS
//
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
  if (source != null)
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
    output = output.concat(postkeys_list);
  }
  return output;
}

//
// Main definition of rules starts from here
//
function manipulatorsA() {
  return [
    //
    // 編集モードキー
    //
    {"description":"(シンクロ) 編集モード1左","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["j", "k"], ["EM1L"], "strict"),
      "to": input_source(null, ["EM1L"]),
      "to_if_alone": key_code_list(["a", "i"])
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["j", "k"], ["EM1L"]),
      "to": input_source(null, ["EM1L"]),
    "to_if_alone": key_code_list(["i", "a"])},
    {"description":"(シンクロ) 編集モード1右","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["d", "f"], ["EM1R"], "strict"),
      "to": input_source(null, ["EM1R"]),
      "to_if_alone": key_code_list(["t", "o", "k", "a"])
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["d", "f"], ["EM1R"]),
      "to": input_source(null, ["EM1R"]),
    "to_if_alone": key_code_list(["k", "a", "t", "o"])},
    {"description":"(シンクロ) 編集モード2左","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["m", "comma"], ["EM2L"], "strict"),
      "to": input_source(null, ["EM2L"]),
      "to_if_alone": key_code_list(["n", "a", "n", "n"])
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["m", "comma"], ["EM2L"]),
      "to": input_source(null, ["EM2L"]),
    "to_if_alone": key_code_list(["n", "n", "n", "a"])},
    {"description":"(シンクロ) 編集モード2右","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["c", "v"], ["EM2R"], "strict"),
      "to": input_source(null, ["EM2R"]),
      "to_if_alone": key_code_list(["h", "a", "k", "o"])
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["c", "v"], ["EM2R"]),
      "to": input_source(null, ["EM2R"]),
    "to_if_alone": key_code_list(["k", "o", "h", "a"])},

    //////////////////////////////////////////////////////////////////////////////
    // 同時連続シフト拡張                                                          //
    //////////////////////////////////////////////////////////////////////////////
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


    //////////////////////////////////////////////////////////////////////////////
    // 本体　　　　　　　                                                          //
    //////////////////////////////////////////////////////////////////////////////

    // EM1L
    delayed("(U.S.使用)(シンクロ) あ, い, 小 → 新", ["j", "k", "q"], [["left_arrow", ["command"]], ["down_arrow", ["command"]], ["lang1", ["shift"]], "lang1"], "com.apple.keylayout.US", non_shifted(), null, ["EM1L"]),
    keydef("(シンクロ/ことえり) あ, い, ろ → ……", ["j", "k", "a"], [["semicolon", ["option"]], ["semicolon", ["option"]], "return_or_enter"], non_shifted(null, null, "kotoeri"), false, ["EM1L"]),
    keydef("(シンクロ/ATOK) あ, い, ろ → ……", ["j", "k", "a"], [["semicolon", ["option"]], ["semicolon", ["option"]]], non_shifted(null, null, "atok"), false, ["EM1L"]),
    delayed("(UNICODE使用)(シンクロ) あ, い, ほ → ──", ["j", "k", "z"], unicode(["2015", "2015"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM1L"]),
    keydef("(日本語IM時)(JIS/US)(シンクロ) あ, い, き → ／", ["j", "k", "w"], [["slash", ["option"]], "return_or_enter"], non_shifted(null, null, "any"), false, ["EM1L"]),
    delayed("(UNICODE使用)(JIS/US)(シンクロ) あ, い, き → ／", ["j", "k", "w"], unicode(["ff0f"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM1L"]),
    keydef("(ことえり時)(シンクロ) あ, い, け → 『", ["j", "k", "s"], [["open_bracket", ["shift"]], "return_or_enter"], non_shifted(null, null, "kotoeri"), false, ["EM1L"]),
    delayed("(UNICODE使用)(シンクロ) あ, い, け → 『", ["j", "k", "s"], unicode(["300e"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM1L"]),
    keydef("(ことえり時)(シンクロ) あ, い, ひ → 』", ["j", "k", "x"], [["close_bracket", ["shift"]], "return_or_enter"], non_shifted(null, null, "kotoeri"), false, ["EM1L"]),
    delayed("(UNICODE使用)(シンクロ) あ, い, ひ → 』", ["j", "k", "x"], unicode(["300f"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM1L"]),
    keydef("(シンクロ) あ, い, と → ？", ["j", "k", "d"], [["slash", ["shift"]], "return_or_enter"], non_shifted(), false, ["EM1L"]),
    keydef("(シンクロ) あ, い, は → ！", ["j", "k", "c"], [["1", ["shift"]], "return_or_enter"], non_shifted(), false, ["EM1L"]),
    keydef("(シンクロ) あ, い, し → 保", ["j", "k", "r"], [["s", ["command"]]], non_shifted(), false, ["EM1L"]),
    keydef("(JIS/US)(シンクロ) あ, い, か → 「", ["j", "k", "f"], ["open_bracket", "return_or_enter"], non_shifted(), false, ["EM1L"]),
    keydef("(JIS/US)(シンクロ) あ, い, こ → 」", ["j", "k", "v"], ["close_bracket", "return_or_enter"], non_shifted(), false, ["EM1L"]),
    keydef("(シンクロ) あ, い, 左 → ・未確定", ["j", "k", "t"], ["slash"], non_shifted(), false, ["EM1L"]),
    // JISキーボード設定は常にUSキーボード設定よりも先に設定しなくてはなりません
    keydef("(JIS)(シンクロ) あ, い, (っ) → （", ["j", "k", "g"], [["8", ["shift"]], "return_or_enter"], non_shifted(null, true, false), false, ["EM1L"]),
    keydef("(US)(シンクロ) あ, い, (っ) → （", ["j", "k", "g"], [["9", ["shift"]], "return_or_enter"], non_shifted(null, false, false), false, ["EM1L"]),
    keydef("(JIS)(シンクロ) あ, い, そ → ）", ["j", "k", "b"], [["9", ["shift"]], "return_or_enter"], non_shifted(null, true, false), false, ["EM1L"]),
    keydef("(US)(シンクロ) あ, い, そ → ）", ["j", "k", "b"], [["0", ["shift"]], "return_or_enter"], non_shifted(null, false, false), false, ["EM1L"]),

    // EM1R
    keydef("(シンクロ) と, か, 右 → Home", ["d", "f", "y"], [["a", ["control"]]], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, く → 確定End", ["d", "f", "h"], ["return_or_enter", "return_or_enter", ["e", ["control"]]], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, た → End", ["d", "f", "n"], [["e", ["control"]]], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, BS → 文末消去", ["d", "f", "u"], [["k", ["control"]]], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, あ → ↑", ["d", "f", "j"], ["up_arrow"], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, な → ↓", ["d", "f", "m"], ["down_arrow"], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, る → 再", ["d", "f", "i"], ["lang1", "lang1"], non_shifted(null, null, "kotoeri"), false, ["EM1R"]),
    keydef("(シンクロ) と, か, る → 再", ["d", "f", "i"], [["r", ["control", "shift"]]], non_shifted(null, null, "atok"), false, ["EM1R"]),
    keydef("(シンクロ) と, か, い → +↑", ["d", "f", "k"], [["up_arrow", ["shift"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, ん → +↓", ["d", "f", "comma"], [["down_arrow", ["shift"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, す → Del", ["d", "f", "o"], ["delete_forward"], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, う → +7↑", ["d", "f", "l"], [["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, ら → +7↓", ["d", "f", "period"], [["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]]], non_shifted(), null, ["EM1R"]),
    keydef("(シンクロ) と, か, へ → 入力キャンセル", ["d", "f", "p"], ["escape", "escape", "escape"], non_shifted(), false, ["EM1R"]),
    keydef("(シンクロ) と, か, ー → カタカナ変換", ["d", "f", "semicolon"], [["k", ["control"]]], non_shifted(null, null, "any"), false, ["EM1R"]),
    keydef("(シンクロ) と, か, れ → ひらがな変換", ["d", "f", "slash"], [["j", ["control"]]], non_shifted(null, null, "any"), false, ["EM1R"]),

    // EM2L
    delayed("(UNICODE使用)(シンクロ) な, ん, 小 → ｜", ["m", "comma", "q"], unicode(["ff5c"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, ろ → 《", ["m", "comma", "a"], unicode(["300a"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, ほ → 》", ["m", "comma", "z"], unicode(["300b"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    // option+( or )による【 or 】の呼び出しは、Kotoeri以外ではできるとは限らない。
    keydef("(JIS)(シンクロ) な, ん, け → 【", ["m", "comma", "s"], [["8", ["option"]], "return_or_enter"], non_shifted(null, true, "kotoeri"), false, ["EM2L"]),
    keydef("(US)(シンクロ) な, ん, け → 【", ["m", "comma", "s"], [["9", ["option"]], "return_or_enter"], non_shifted(null, false, "kotoeri"), false, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, け → 【", ["m", "comma", "s"], unicode(["3010"], [["lang1", ["shift"]], "lang1"]),  "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"], true),
    keydef("(JIS)(シンクロ) な, ん, ひ → 】", ["m", "comma", "x"], [["9", ["option"]], "return_or_enter"], non_shifted(null, true, "kotoeri"), false, ["EM2L"]),
    keydef("(US) (シンクロ) な, ん, ひ → 】", ["m", "comma", "x"], [["0", ["option"]], "return_or_enter"], non_shifted(null, false, "kotoeri"), false, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, ひ → 】", ["m", "comma", "x"], unicode(["3011"], [["lang1", ["shift"]], "lang1"]),  "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"], true),

    // EM2R
    keydef("(シンクロ) は, こ, 右 → +Home", ["c", "v", "y"], [["left_arrow", ["shift","control"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, く → Copy", ["c", "v", "h"], [["c", ["command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, た → +End", ["c", "v", "n"], [["right_arrow", ["shift","control"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, BS → Cut", ["c", "v", "u"], [["x", ["command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, あ → ←", ["c", "v", "j"], ["left_arrow"], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, な → +←", ["c", "v", "m"], [["left_arrow", ["shift"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, る → 再", ["c", "v", "i"], ["lang1", "lang1"], non_shifted("EM2R", null, "kotoeri"), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, る → 再", ["c", "v", "i"], [["r", ["control", "shift"]]], non_shifted("EM2R", null, "atok"), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, い → →", ["c", "v", "k"], ["right_arrow"], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, ん → +→", ["c", "v", "comma"], [["right_arrow", ["shift"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, す → Paste", ["c", "v", "o"], [["v", ["command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, う → コピークリア", ["c", "v", "l"], ["spacebar", ["left_arrow", ["shift"]], ["x", ["command"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, ら → +←7", ["c", "v", "period"], [["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]]], non_shifted(), null, ["EM2R"]),
    keydef("(シンクロ) は, こ, へ → Undo", ["c", "v", "p"], [["z", ["command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, ー → Redo", ["c", "v", "semicolon"], [["z", ["shift","command"]]], non_shifted(), false, ["EM2R"]),
    keydef("(シンクロ) は, こ, れ → +→7", ["c", "v", "slash"], [["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]]], non_shifted(), null, ["EM2R"]),
    
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
    keydef("(ことえり時)[あ, い] ろ → ……", "a", [["semicolon", ["option"]], ["semicolon", ["option"]], "return_or_enter"], non_shifted("EM1L", false, "kotoeri"), false),
    keydef("(ATOK時)[あ, い] ろ → ……", "a", [["semicolon", ["option"]], ["semicolon", ["option"]]], non_shifted("EM1L", false, "atok"), false),
    keydef("[あ, い] ろ → ……", "a", [["semicolon", ["option"]], ["semicolon", ["option"]], "return_or_enter"], non_shifted("EM1L"), false),
    delayed("(UNICODE使用)[あ, い] ほ → ──", "z", unicode(["2015", "2015"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM1L"), null),
    keydef("(日本語IM時)[あ, い] き → ／", "w", [["slash", ["option"]], "return_or_enter"], non_shifted("EM1L"), false),
    delayed("(UNICODE使用)[あ, い] き → ／", "w", unicode(["ff0f"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM1L"), null),
    keydef("(ことえり時)[あ, い] け → 『", "s", [["open_bracket", ["shift"]], "return_or_enter"], non_shifted("EM1L", false, "kotoeri")),
    delayed("(UNICODE使用)[あ, い] け → 『", "s", unicode(["300e"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM1L"), null),
    keydef("(ことえり時)(日本語IM時)[あ, い] ひ → 』", "x", [["close_bracket", ["shift"]], "return_or_enter"], non_shifted("EM1L", false, "kotoeri"), false),
    delayed("(UNICODE使用)[あ, い] ひ → 』", "x", unicode(["300f"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM1L"), null),
    keydef("[あ, い] と → ？", "d", [["slash", ["shift"]], "return_or_enter"], non_shifted("EM1L"), false),
    keydef("[あ, い] は → ！", "c", [["1", ["shift"]], "return_or_enter"], non_shifted("EM1L"), false),
    keydef("[あ, い] し → 保", "r", [["s", ["command"]]], non_shifted("EM1L"), false),
    keydef("[あ, い] か → 「", "f", ["open_bracket", "return_or_enter"], non_shifted("EM1L", null), false),
    keydef("[あ, い] こ → 」", "v", ["close_bracket", "return_or_enter"], non_shifted("EM1L", null), false),
    keydef("[あ, い] 左 → ・未確定", "t", ["slash"], non_shifted("EM1L")),
    keydef("(JIS/US)[あ, い] (っ) → （", "g", [["8", ["shift"]], "return_or_enter"], non_shifted("EM1L", true, false), null),
    keydef("", "g", [["9", ["shift"]], "return_or_enter"], non_shifted("EM1L", false, false), null),
    keydef("(JIS/US)[あ, い] そ → ）", "b", [["9", ["shift"]], "return_or_enter"], non_shifted("EM1L", true, false), null),
    keydef("", "b", [["0", ["shift"]], "return_or_enter"], non_shifted("EM1L", false, false), null),
    keydef("[と, か] 右 → Home", "y", [["a", ["control"]]], non_shifted("EM1R"), false),
    keydef("[と, か] く → 確定End", "h", ["return_or_enter", "return_or_enter", ["e", ["control"]]], non_shifted("EM1R"), false),
    keydef("[と, か] た → End", "n", [["e", ["control"]]], non_shifted("EM1R"), false),
    keydef("[と, か] BS → 文末消去", "u", [["k", ["control"]]], non_shifted("EM1R"), false),
    keydef("[と, か] あ → ↑", "j", ["up_arrow"], non_shifted("EM1R")),
    keydef("[と, か] な → ↓", "m", ["down_arrow"], non_shifted("EM1R")),
    keydef("[と, か] る → 再", "i", ["lang1", "lang1"], non_shifted("EM1R", null, "kotoeri")),
    keydef("[と, か] る → 再", "i", [["r", ["control", "shift"]]], non_shifted("EM1R", null, "atok")),
    keydef("[と, か] い → +↑", "k", [["up_arrow", ["shift"]]], non_shifted("EM1R")),
    keydef("[と, か] ん → +↓", "comma", [["down_arrow", ["shift"]]], non_shifted("EM1R")),
    keydef("[と, か] す → Del", "o", ["delete_forward"], non_shifted("EM1R")),
    keydef("[と, か] う → +7↑", "l", [["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]], ["up_arrow", ["shift"]]], non_shifted("EM1R")),
    keydef("[と, か] ら → +7↓", "period", [["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]], ["down_arrow", ["shift"]]], non_shifted("EM1R")),
    keydef("[と, か] へ → 入力キャンセル", "p", ["escape", "escape", "escape"], non_shifted("EM1R")),
    // 動作しない 
    keydef("[と, か] ー → カタカナ変換", "semicolon", [["k", ["control"]]], non_shifted("EM1R")),
    keydef("[と, か] れ → ひらがな変換", "slash", [["j", ["control"]]], non_shifted("EM1R")),
    // IM版追加
    delayed("(UNICODE使用)[な, ん] 小 → ｜", "q", unicode(["ff5c"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    delayed("(UNICODE使用)[な, ん] ろ → 《", "a", unicode(["300a"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    delayed("(UNICODE使用)[な, ん] ほ → 》", "z", unicode(["300b"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    keydef("(JIS)[な, ん], け → 【", "s", [["8", ["option"]], "return_or_enter"], non_shifted("EM2L", true, "kotoeri")),
    keydef("(US) [な, ん], け → 【", "s", [["9", ["option"]], "return_or_enter"], non_shifted("EM2L", false, "kotoeri")),
    delayed("(UNICODE使用)[な, ん] け → 【", "s", unicode(["3010"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    keydef("(JIS)[な, ん], ひ → 】", "x", [["9", ["option"]], "return_or_enter"], non_shifted("EM2L", true, "kotoeri")),
    keydef("(US) [な, ん], ひ → 】", "x", [["0", ["option"]], "return_or_enter"], non_shifted("EM2L", false, "kotoeri")),
    delayed("(UNICODE使用)[な, ん] ひ → 】", "x", unicode(["3011"], [["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    keydef("[は, こ] 右 → +Home", "y", [["left_arrow", ["shift","control"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] く → Copy", "h", [["c", ["command"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] た → +End", "n", [["right_arrow", ["shift","control"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] BS → Cut", "u", [["x", ["command"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] あ → ←", "j", ["left_arrow"], non_shifted("EM2R"), false),
    keydef("[は, こ] な → +←", "m", [["left_arrow", ["shift"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] る → 再", "i", ["lang1", "lang1"], non_shifted("EM2R", null, "kotoeri"), false),
    keydef("[は, こ] る → 再", "i", [["r", ["control", "shift"]]], non_shifted("EM2R", null, "atok"), false),
    keydef("[は, こ] い → →", "k", ["right_arrow"], non_shifted("EM2R"), false),
    keydef("[は, こ] ん → +→", "comma", [["right_arrow", ["shift"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] す → Paste", "o", [["v", ["command"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] う → コピークリア", "l", ["spacebar", ["left_arrow", ["shift"]], ["x", ["command"]]], non_shifted("EM2R")),
    keydef("[は, こ] ら → +←7", "period", [["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]], ["left_arrow", ["shift"]]], non_shifted("EM2R")),
    keydef("[は, こ] へ → Undo", "p", [["z", ["command"]]], non_shifted("EM2R"), false),
    keydef("[は, こ] ー → Redo", "semicolon", [["z", ["shift","command"]]], non_shifted("EM2R")),
    keydef("[は, こ] れ → +→7", "slash", [["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]], ["right_arrow", ["shift"]]], non_shifted("EM2R")),
    
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

function manipulatorsB1() {
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

function manipulatorsB2() {
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

function macro0a() {
  return [
    {"description":"(シンクロ) 編集モード2左","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["m", "comma"], ["EM2L"], "strict"),
      "to": input_source(null, ["EM2L"]),
      "to_if_alone": key_code_list(["n", "a", "n", "n"])
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["m", "comma"], ["EM2L"]),
      "to": input_source(null, ["EM2L"]),
    "to_if_alone": key_code_list(["n", "n", "n", "a"])},

    delayed("(UNICODE使用)[な, ん] 左 → ○", "t", unicode(["25cb"],[["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    keydef("[な, ん] し → セリフ切り", "r", [["up_arrow", ["command"]], "return_or_enter", "spacebar", ["n", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] え → セリフ接ぎ", "e", [["up_arrow", ["command"]], ["p", ["control"]], ["down_arrow", ["command"]], "delete_forward", "delete_forward", ["e", ["control"]], ["n", ["control"]]], non_shifted("EM2L"), false),
    delayed("(UNICODE使用)[な, ん] き → x   x   x", "w",
      unicode(["3000", "3000", "3000", "00d7", "3000", "3000", "3000", "00d7", "3000", "3000", "3000", "00d7"], [["lang1", ["shift"]], "lang1"]),
      "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    keydef("[な, ん] っ → □□□", "g", ["spacebar", "spacebar", "spacebar"], non_shifted("EM2L")),
    keydef("[な, ん] か → ト書き切り", "f", [["up_arrow", ["command"]], "return_or_enter", "spacebar", "spacebar", "spacebar", ["n", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] と → ト書き接ぎ", "d", [["up_arrow", ["command"]], ["p", ["control"]], ["down_arrow", ["command"]], "delete_forward", "delete_forward", "delete_forward", "delete_forward", ["e", ["control"]], ["n", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] そ → 」↓□", "b", ["close_bracket", "return_or_enter", "return_or_enter", "spacebar"], non_shifted("EM2L"), false),
    keydef("[な, ん] こ → 」↓「", "v", ["close_bracket", "return_or_enter", "return_or_enter", "open_bracket", "return_or_enter"], non_shifted("EM2L"), false),
    keydef("[な, ん] は → 」↓", "c", ["close_bracket", "return_or_enter", "return_or_enter"], non_shifted("EM2L"), false),

    delayed("(UNICODE使用)(シンクロ) な, ん, 左 → ○", ["m", "comma", "t"], unicode(["25cb"],[["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    keydef("(シンクロ) な, ん, し → セリフ切り", ["m", "comma", "r"], [["up_arrow", ["command"]], "return_or_enter", "spacebar", ["n", ["control"]]], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, え → セリフ接ぎ", ["m", "comma", "e"], [["up_arrow", ["command"]], ["p", ["control"]], ["down_arrow", ["command"]], "delete_forward", "delete_forward", ["e", ["control"]], ["n", ["control"]]], non_shifted(), false, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, き → x   x   x", ["m", "comma", "w"],
      unicode(["3000", "3000", "3000", "00d7", "3000", "3000", "3000", "00d7", "3000", "3000", "3000", "00d7"], [["lang1", ["shift"]], "lang1"]),
      "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    keydef("(シンクロ) な, ん, っ → □□□", ["m", "comma", "g"], ["spacebar", "spacebar", "spacebar"], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, か → ト書き切り", ["m", "comma", "f"], [["up_arrow", ["command"]], "return_or_enter", "spacebar", "spacebar", "spacebar", ["n", ["control"]]], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, と → ト書き接ぎ", ["m", "comma", "d"], [["up_arrow", ["command"]], ["p", ["control"]], ["down_arrow", ["command"]], "delete_forward", "delete_forward", "delete_forward", "delete_forward", ["e", ["control"]], ["n", ["control"]]], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん そ → 」↓□", ["m", "comma", "b"], ["close_bracket", "return_or_enter", "return_or_enter", "spacebar"], non_shifted("EM2L"), false),
    keydef("(シンクロ) な, ん こ → 」↓「", ["m", "comma", "v"], ["close_bracket", "return_or_enter", "return_or_enter", "open_bracket", "return_or_enter"], non_shifted("EM2L"), false),
    keydef("(シンクロ) な, ん は → 」↓", ["m", "comma", "c"], ["close_bracket", "return_or_enter", "return_or_enter"], non_shifted("EM2L"), false),
  ]
}

function macro0b() {
  return [
    {"description":"(シンクロ) 編集モード2左","type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["m", "comma"], ["EM2L"], "strict"),
      "to": input_source(null, ["EM2L"]),
      "to_if_alone": key_code_list(["n", "a", "n", "n"])
    },
    {"type":"basic",
      "conditions": non_shifted(),
      "parameters":{"basic.simultaneous_threshold_milliseconds":20},
      "from": process_from(["m", "comma"], ["EM2L"]),
      "to": input_source(null, ["EM2L"]),
    "to_if_alone": key_code_list(["n", "n", "n", "a"])},

    delayed("(UNICODE使用)[な, ん] 左 → ○", "t", unicode(["25cb"],[["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    keydef("[な, ん] し → セリフ切り", "r", [["left_arrow", ["command"]], "return_or_enter", "spacebar", ["n", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] え → セリフ接ぎ", "e", [["left_arrow", ["command"]], ["p", ["control"]], ["right_arrow", ["command"]], "delete_forward", "delete_forward", ["e", ["control"]], ["n", ["control"]]], non_shifted("EM2L"), false),
    delayed("(UNICODE使用)[な, ん] き → x   x   x", "w",
      unicode(["3000", "3000", "3000", "00d7", "3000", "3000", "3000", "00d7", "3000", "3000", "3000", "00d7"], [["lang1", ["shift"]], "lang1"]),
      "com.apple.keylayout.UnicodeHexInput", non_shifted("EM2L"), null),
    keydef("[な, ん] っ → □□□", "g", ["spacebar", "spacebar", "spacebar"], non_shifted("EM2L")),
    keydef("[な, ん] か → ト書き切り", "f", [["left_arrow", ["command"]], "return_or_enter", "spacebar", "spacebar", "spacebar", ["n", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] と → ト書き接ぎ", "d", [["left_arrow", ["command"]], ["p", ["control"]], ["right_arrow", ["command"]], "delete_forward", "delete_forward", "delete_forward", "delete_forward", ["e", ["control"]], ["n", ["control"]]], non_shifted("EM2L"), false),
    keydef("[な, ん] そ → 」↓□", "b", ["close_bracket", "return_or_enter", "return_or_enter", "spacebar"], non_shifted("EM2L"), false),
    keydef("[な, ん] こ → 」↓「", "v", ["close_bracket", "return_or_enter", "return_or_enter", "open_bracket", "return_or_enter"], non_shifted("EM2L"), false),
    keydef("[な, ん] は → 」↓", "c", ["close_bracket", "return_or_enter", "return_or_enter"], non_shifted("EM2L"), false),

    delayed("(UNICODE使用)(シンクロ) な, ん, 左 → ○", ["m", "comma", "t"], unicode(["25cb"],[["lang1", ["shift"]], "lang1"]), "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    keydef("(シンクロ) な, ん, し → セリフ切り", ["m", "comma", "r"], [["left_arrow", ["command"]], "return_or_enter", "spacebar", ["n", ["control"]]], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, え → セリフ接ぎ", ["m", "comma", "e"], [["left_arrow", ["command"]], ["p", ["control"]], ["right_arrow", ["command"]], "delete_forward", "delete_forward", ["e", ["control"]], ["n", ["control"]]], non_shifted(), false, ["EM2L"]),
    delayed("(UNICODE使用)(シンクロ) な, ん, き → x   x   x", ["m", "comma", "w"],
      unicode(["3000", "3000", "3000", "00d7", "3000", "3000", "3000", "00d7", "3000", "3000", "3000", "00d7"], [["lang1", ["shift"]], "lang1"]),
      "com.apple.keylayout.UnicodeHexInput", non_shifted(), null, ["EM2L"]),
    keydef("(シンクロ) な, ん, っ → □□□", ["m", "comma", "g"], ["spacebar", "spacebar", "spacebar"], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, か → ト書き切り", ["m", "comma", "f"], [["left_arrow", ["command"]], "return_or_enter", "spacebar", "spacebar", "spacebar", ["n", ["control"]]], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん, と → ト書き接ぎ", ["m", "comma", "d"], [["left_arrow", ["command"]], ["p", ["control"]], ["right_arrow", ["command"]], "delete_forward", "delete_forward", "delete_forward", "delete_forward", ["e", ["control"]], ["n", ["control"]]], non_shifted(), false, ["EM2L"]),
    keydef("(シンクロ) な, ん そ → 」↓□", ["m", "comma", "b"], ["close_bracket", "return_or_enter", "return_or_enter", "spacebar"], non_shifted("EM2L"), false),
    keydef("(シンクロ) な, ん こ → 」↓「", ["m", "comma", "v"], ["close_bracket", "return_or_enter", "return_or_enter", "open_bracket", "return_or_enter"], non_shifted("EM2L"), false),
    keydef("(シンクロ) な, ん は → 」↓", ["m", "comma", "c"], ["close_bracket", "return_or_enter", "return_or_enter"], non_shifted("EM2L"), false),
  ]
}

function LyX() {
  var command_keys = [["a", ["command"]], ["c", ["command"]], ["c", ["control"]], ["m", ["command"]],
    ["p", ["command"]], ["x", ["control"]]];
  var output = [];
  for (var i=0; i<command_keys.length; i++) {
    output.push(
      {
        "type":"basic",
        "description": "LyX emacsキーバインディング",
        "conditions": japanese_input(),
        "from": {
          "key_code": command_keys[i][0],
          "modifiers": {"mandatory": command_keys[i][1]}
        },
        "to": {"key_code": command_keys[i][0], "modifiers": command_keys[i][1]},
        "to_after_key_up": [{"set_variable": {"name": "command", "value": true}}]
      }
    );
  }
  // keys that can come after command igniter
  for (var code=65; code<91; code++) {
    output.push(
      {
        "type":"basic",
        "description": "Commandモード解除",
        "conditions": [{"type": "variable_if", "name": "command", "value": true}],
        "from": {"key_code": code},
        "to": {"key_code": code},
        "to_after_key_up": [{"set_variable": {"name": "command", "type": "unset"}}]
      }
    )
  }
  return output;
}

function main() {
  console.log(
    JSON.stringify(
      {
        "title":"Key layout for Japanese \"薙刀式\" 16",
        "rules":[
          {
            "description": "O1: 小説・脚本マクロ（縦書き:O2と排他的）",
            "manipulators": macro0a()
          },
          {
            "description": "O2: 小説・脚本マクロ（横書き:O1と排他的）",
            "manipulators": macro0b()
          },
          {
            "description": "O3: LyX emacsバインディング対応",
            "manipulators": LyX()
          },
          {
            "description": "A: 本体",
            "manipulators": manipulatorsA()
          },
          {
            "description": "B1: 左右シフトかな拡張",
            "manipulators": manipulatorsB1()
          },
          {
            "description": "B2: エンター同時押しシフト拡張",
            "manipulators": manipulatorsB2()
          }
        ]
      }, null, '  '
    )
  )
}

main()
