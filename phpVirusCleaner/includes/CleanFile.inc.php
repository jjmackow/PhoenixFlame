<?php

class CleanFile{
	//properties and methods go here.
	protected $_startString = "@eval( base64_decode('aWYobWQ1KCRfUE9TVFsicGYiXSk";
	protected $_endString = "?>";
	protected $isDirty = FALSE;
	protected $isCleaned = FALSE;
		
	//look for an occurance of startString. 
	//If it is found then look for the end string;		 

	public function __construct ($fileName="index.php") {
		//If the file is nothing then default it to index.php
		$file = file($fileName);
		if ($file){	
			for ($i = 0; $i<= count($file); $i++){
				$startPos = strpos ( $file[$i], $this->_startString);
				if ($startPos >= 1){
					//if there is a stratPos then find the endPos
					$endPos = strpos( $file[$i], $this->_endString, $startPos);
					
					$file[$i] = substr( $file[$i], $endPos+strlen($this->_endString));
					$this->isDirty = TRUE;
				}
			}
			file_put_contents($fileName, $file);
		}
		return $file;
	}
	public function __destruct (){
		echo "CleanFile Destoyed";
	}

	public function cleanStatus() {
		return $this->isCleaned;
	}
	public function CleanMe(){
		if($this->isDirty){
			file_put_contents($fileName, $file);
			$this->isDirty = FALSE;
		}
		$this->isCleaned = TRUE;
	}
}
?>