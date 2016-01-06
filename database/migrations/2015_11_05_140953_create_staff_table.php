<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        
        
                    Schema::create('staff', function(Blueprint $table) {
            
                    $table->bigIncrements('id')
                    
                    
                    
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
        

        

        
            Schema::dropIfExists('staff');
        
    }
}
?>
