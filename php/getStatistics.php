<?php

error_reporting(E_ALL);

$link = mysql_connect('localhost', 'root', 'root');
if (!$link) {
	die('Could not connect: ' . mysqli_error($link));
}
mysql_select_db("uatester");

/** Get the top 10 user agents with lowest risk score */
function getTop10() {
	
	$sql = "SELECT DISTINCT * FROM browser_results ORDER BY points DESC LIMIT 0,10";

	$result = mysql_query($sql);
	$row = mysql_fetch_assoc($result);
		
	return $row;		
}

getTop10();

?>