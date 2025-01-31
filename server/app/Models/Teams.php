<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teams extends Model
{
    protected $fillable = ['name', 'password'];

    public function leader()
    {
        return $this->belongsTo(User::class, 'leader_id');
    }

    public function participants()
    {
        return $this->hasMany(User::class);
    }

    public function isFull()
    {
        return $this->participants()->count() >= 3;
    }
}
