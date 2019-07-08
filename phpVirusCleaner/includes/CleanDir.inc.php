<?php
include 'CleanFile.inc.php';

//clean directory
//Properties:
//Public
  class CleanDir{
		protected $IsClean = false;
		protected $dirPath = "";
		protected $fileList = array();
		protected $dirList = array();
		protected $subDir;
    protected $fileTpe = ".php";
			
		public function __construct($dirPath = ""){
			if (strcmp(substr($dirPath, strlen($dirPath)-1),"/") != 0){
				$dirPath = $dirPath."/";
			}
			$this->dirPath = $dirPath;
			$dirListing = scandir($dirPath);
				
			for($i=0;$i<sizeof($dirListing);$i++){
				$curFile = $dirListing[$i];
				if(filetype($dirPath.$curFile)=="file"){
					if(strcmp(strtolower(substr($curFile, strlen($curFile)-4)),".php") == 0){
						array_push($this->fileList,$dirPath.$curFile);						
					}
				} elseif (filetype($dirPath.$curFile)=="dir") {
					if (strcmp($curFile,".") <> 0){
						if (strcmp($curFile,"..") <> 0) {
							array_push($this->dirList,$dirPath.$curFile);
						}						
					}					
				}				
			}				
		}
		
		public function __destruct(){			
		}
		
		public function disInfect(){
			var_dump($this);
			echo "<br><br><br>";
			for($i = 0;$i <= sizeof($this->fileList);$i++){
				$curFile = $this->fileList[$i];
				$file = new CleanFile($curFile);
				//$file->cleanMe();
			}
			for($i = 0;$i <= sizeof($this->fileDir);$i++){
				$curDir = $this->dirList[$i];
				if($curDir !=''){
					$this->subDir = new CleanDir($curDir);
					$this->subDir->disInfect();				
				}
			}
			
		}
	}
//methods
  	
	
?>
