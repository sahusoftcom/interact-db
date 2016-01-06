<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        
        
                    Schema::create('photos', function(Blueprint $table) {
            
                    $table->bigIncrements('id')
                    
                    
                    
                    ;
            
                    $table->bigInteger('photoable_id')
                    
                    ->unsigned()
                    
                    ;
            
                    $table->string('photoable_type', 255)
                    
                    
                    
                    ;
            

            

            

            $table->engine = 'InnoDB';

            

            

            

            

            
        });
        

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        

        

        
            Schema::dropIfExists('photos');
        
    }
}
?>
