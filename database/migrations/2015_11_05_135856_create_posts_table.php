<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        
        
                    Schema::create('posts', function(Blueprint $table) {
            
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

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        

        

        
            Schema::dropIfExists('posts');
        
    }
}
?>
