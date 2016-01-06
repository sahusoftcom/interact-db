<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;



class Post extends Model {

	

	
	public $timestamps = false;
	

	
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'posts';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [ 'id'  ] ;

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = [];

	/**
	 * The rules applicable on attributes.
	 *
	 * @var array
	 */
	protected $rules = [];

	/**
	 * Validation messages to show upon insert fail.
	 *
	 * @var array
	 */
	protected $validationMessages = [];

	/**
	 * Model Relationships
	 */
	
	
		
			public function user()
		    {
		        return $this->belongsTo('App\User');
		    }
		
		
		
	
	
}
?>