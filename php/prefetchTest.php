<?php

	error_reporting(E_ALL);
	
	/** Set a separate cookie if a request was made for this script */
	if (!isset($_COOKIE['upt_link_prefetch'])) {
		setcookie('upt_link_prefetch', '1', time() + (86400 * 1), '/', NULL, false, false);
	}

?>