<?php

namespace App\Http\Controllers;

use App\Models\Teams;
use App\Models\User;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function assignParticipantToTeam(Request $request, $teamId){
    $team = Teams::findOrFail($teamId);

    // Ensure the team is not full
    if ($team->isFull()) {
        return back()->withErrors(['team' => 'This team is already full.']);
    }

    // Assign a participant to the team
    $user = User::findOrFail($request->user_id);
    $user->team_id = $team->id;
    $user->save();

    return back()->with('success', 'Participant added to team successfully!');
}
}
