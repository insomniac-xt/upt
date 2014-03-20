<?php

error_reporting(E_ALL);

$link = mysql_connect('localhost', 'root', 'root');
if (!$link) {
	die('Could not connect: ' . mysqli_error($link));
}
mysql_select_db("uatester");

$uniqueId = uniqid(); 
 
/** Set a unique cookie if it does not yet exists */
if (!isset($_COOKIE['ua_privacy_tester']) ) {
	setcookie('ua_privacy_tester', $uniqueId, time() + (86400 * 365), '/', NULL, false, true);	
} else {
	$uniqueId = $_COOKIE['ua_privacy_tester'];
}

/** Sanitize and return the data */
function sanitizeInput($data)
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data, ENT_NOQUOTES);
  $data = mysql_real_escape_string($data);
  return $data;
}


/** Check if previous entry already exists for the given user id */
function getPreviousEntry($uniqueId) {
	
	$uniqueId = $_COOKIE['ua_privacy_tester'];	
	$sql = "SELECT points, results FROM browser_results WHERE userId = '" . sanitizeInput($uniqueId) . "' ORDER BY id DESC LIMIT 0,1";

	$result = mysql_query($sql);
	$row = mysql_fetch_assoc($result);
	
	return $row;
		
}



$previousEntry = getPreviousEntry($uniqueId);

if(isset($_POST) && !empty($_POST)) {
	
    $os_system = sanitizeInput($_POST["os_system"]);
  	$browsername = sanitizeInput($_POST["browsername"]);
  	$version = sanitizeInput($_POST["version"]);
  	$points = sanitizeInput($_POST["points"]);
  	$results = sanitizeInput($_POST["results"]);	
	
	/** Is it really a new entry that needs to be stored? */
	if($os_system && $browsername && $version && $points && $results && $previousEntry['points'] != $points && $previousEntry['results'] != $results) {
		
		$sql = "INSERT INTO browser_results (userId, os_system, browsername, version, points, results) 
			VALUES ('" . $uniqueId . "','" . $os_system. "','" .  $browsername ."','" .  $version . "','" .  $points . "','" .  $results ."')";
		
		/* Insert into DataBase */
		if(mysql_query($sql, $link)){
	   		echo 'added';			
	   	} else{
	   		echo mysql_errno($link) . ": " . mysql_error($link) . "\n";
	   	}	
		
	} else {
		echo 'No changes found in your settings';
	}
	
}







?>
