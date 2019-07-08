<?php
include 'includes/CleanDir.inc.php';

$path = realpath('/var/www/html-virt/redparka.sunnyslips.com/sitesssss/');

$objects = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::SELF_FIRST);
foreach($objects as $name => $object){
  if(filetype($name)=='file'){
		if(strcmp(strtolower(substr($name, strlen($name)-4)),".php") == 0){
			echo filetype($name)." ... $name\n<br>";
			$file = new CleanFile($name);
			$file->cleanMe();
		}			
	}
}

?>
