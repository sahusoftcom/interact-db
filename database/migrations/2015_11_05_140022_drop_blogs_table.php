<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
            Schema::dropIfExists('blogs');
        
        
        

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        

        
                    Schema::create('blogs', function(Blueprint $table) {
            
                    $table->bigIncrements('id')
                    
                    
                    
                    ;
            
                    $table->bigInteger('user_id')
                    
                    ->unsigned()
                    
                    ;
            

            

            

            $table->engine = 'InnoDB';

            

            

            

            

            
                $table->foreign('user_id')->references('id')->on('users')
                
                ;
            
        });
        

        
    }
}
?>
