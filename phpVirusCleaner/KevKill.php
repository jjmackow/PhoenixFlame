<?php 
class KevKill(
  //will change appropriate files within the directory and 
	//return an array of subdirectories within the directory.
	protected $_directory = '.'; 
)
// take inputs of 
//   - directory $directory
//   - file extensions  $fileExt (Default php)
//   - start string $startStr 
//   - end string $endStr

// collect an Array of the files ending in $fileExt within the $directory
// foreach file, see if it contains the $startStr
//   
//   if it does then 
//     find the position $startPos of the first occurance of the $startStr;
//     find the position $endPos of the first occurance of the $endStr that follows the $startStr;
//     remove the first ( $endPos + the length of the $endStr ) from the file
//     re-write the file contents to the file
//
// find all the subdirectories within $directory;
// for each subdirectory do the same recursively do the same   
?>
