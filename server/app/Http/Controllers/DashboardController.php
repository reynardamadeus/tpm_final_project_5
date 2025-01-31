<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function teamDashboard(){
        $user = auth()->user();

        if ($user->role !== 'team_leader') {
            return redirect()->route('participant.dashboard');
        }

        $team = $user->team; // Get the team the leader belongs to
        $participants = $team->users()->where('role', 'participant')->get(); // Get team participants

        return view('dashboard.team', compact('team', 'participants'));
    }

    public function participantDashboard(){
        $user = auth()->user();

        if ($user->role !== 'participant') {
            return redirect()->route('team.dashboard');
        }

        $team = $user->team; // Get the team the participant belongs to

        return view('dashboard.participant', compact('team'));
    }

}
