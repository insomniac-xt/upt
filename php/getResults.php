<?php

	error_reporting(E_ALL);
	
	$link = mysql_connect('localhost', 'root', 'root');
	if (!$link) {
		die('Could not connect: ' . mysqli_error($link));
	}	
	mysql_select_db("uatester");
	
	
	$uniqueId = '';
	
	
	/** Sanitize and return the data */
	function sanitizeInput($data)
	{
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data, ENT_NOQUOTES);
	  $data = mysql_real_escape_string($uniqueId);
	  return $data;
	}
		
	
	
	
	/* TODO For feature versions of UPT to get statistics */
	if (!isset($_COOKIE['ua_privacy_tester'])) {
		$uniqueId = $_COOKIE['ua_privacy_tester'];
		$sql = "SELECT * FROM browser_results WHERE userId = '" . sanitizeInput($uniqueId) . "' ORDER BY id DESC LIMIT 0,1";
	
		$result = mysql_query($sql);
		
		$rows = array();
		while ($r = mysql_fetch_assoc($result)) {
			$rows[] = $r;
		}
		echo json_encode($rows);
	} else {
		echo 'Nothing for you, mate!';
	}
	

?>