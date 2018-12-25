<?php
header('Content-Type: text/html; charset=UTF-8');
	echo('<link rel="stylesheet" href="./admin.css" />');

	$id = $_GET["id"];

	if(!empty($_GET["edit"])) {
		// もしもeditがあったら、ここからjsonに書き込み
			$title = $_GET["title"];
			$link = $_GET["link"];
			$date = $_GET["date"];
			$hide = !empty($_GET["hide"]) ? $_GET["hide"] : "";
			//print_r(array($title, $link, $hide));

			// json読み込み
			$json = file_get_contents("../json/data.json" );
			$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
			$json = json_decode ($json, TRUE); // 文字列をArrayに変換

			foreach($json as &$news) {
				if($news['id'] == $id) {
					//print_r($news);
					$news = array('id'=>$id, 'date'=>$date, 'title'=>$title, 'link'=>$link, 'hide'=>$hide);
				}
			}
			unset($news);
			$json = json_encode($json); // ArrayをJSON文字列に変換
			$success = file_put_contents("../json/data.json", $json); // ファイルに書き込み
			if($success) {
				print("投稿しましたよ！");
				//readfile("../json/data.json");
				print("<a href='./index.html'>もどる</a>");
			} else {
				print("うわ〜〜〜失敗したにゃ！もう一回やってにゃ");
			}

			exit();
		}

	 // もしもidがなかったら、、リンク切れだよ
	if(!$id) {
		print("記事がないよ");
		exit();
	}



	$json = file_get_contents("../json/data.json" );
	$json = mb_convert_encoding($json, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
	$json = json_decode ($json, TRUE); // 文字列をArrayに変換
	print('<div id="app"><h1>編集</h1>');
	print("<form action='./update.php' method='GET'>");
	$isHide = "";
	foreach($json as $item) {
		if($item["id"] == $id) {
			print("<label><span>投稿タイトル</span><input class='main-input' type='text' name='title' value='".$item["title"]."' ></label>");
			print("<label><span>日付</span><input class='main-input' type='text' name='date' value='".$item["date"]."' ></label>");
			print("<label><span>リンクURL</span><input class='main-input' type='text' name='link' value='".$item["link"]."' ></label>");
			if(!empty($item["hide"])) {
				$isHide = "checked";
			}
		}
	}

	print('<label><input type="checkbox" name="hide" id="hide-news" '.$isHide.'> 非表示にする</label>');

	print('<input type="hidden" name="id" value="'.$id.'">');
	print('<input type="hidden" name="edit" value="edit">');
	print('<input type="submit" value="修正">');
	print('</form>');
	print('</div>');

?>