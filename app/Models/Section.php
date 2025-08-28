<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    //
    protected $table ='sections';
    protected $fillable = [
        'company_id', 'name','code', 'description','manager', 'active'
    ];

    // relacion con empresa
    public function company() {
        return $this->belongsTo(Company::class, 'company_id');
    }
}
