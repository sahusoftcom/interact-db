<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        
        
        
                    Schema::create('orders', function(Blueprint $table) {
            
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
        

        

        
            Schema::dropIfExists('orders');
        
    }
}
?>
