<?php
	$title = $_POST["title"];
	$link = $_POST["link"];
	$date = $_POST["date"];
	$json = file_get_contents("./data.json" );
	$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
	$json = json_decode ($json, TRUE); // 文字列をArrayに変換
	if(!$json) {
		$json = array();
	}
	$postdata = [ // 追加要素
		"title" => $title,
		"link" => $link,
		"date" => $date,
		"id" => uniqid()
	];
	array_push($json, $postdata); // 追加
	
	$json = json_encode($json); // ArrayをJSON文字列に変換
	//var_dump($json);
	$success = file_put_contents("./data.json", $json); // ファイルに書き込み

	if($success) {
		print("投稿しましたよ！");
		//readfile("./data.json");
		print("<a href='./index.html'>もどる</a>");
	} else {
		print("うわ〜〜〜失敗したにゃ！もう一回やってにゃ");
	}




	/* foreach($json as $item) {
		print($item['link']);
	} */

?>