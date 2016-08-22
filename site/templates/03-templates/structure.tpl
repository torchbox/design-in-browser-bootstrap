{% extends "base.tpl" %}

{% block structure %}
<header class="t-header">
    <div class="content">
        {# {% include "02-organisms/00-global/00-header.tpl" %} #}
        {# {% include "02-organisms/00-global/00-header.twig" %} #}
    </div>
</header>
<main>
    <div class="t-notifications">
        <div class="content">
            {# {% include "core/notifications.tpl" %} #}
        </div>
    </div>
    <nav class="t-navigation">
        <div class="content">
            {# {% include "core/navigation.tpl" %} #}
        </div>
    </nav>
    <div class="t-content">
        <div class="content">
            {% block content %}{% endblock %}
        </div>
    </div>
    <footer class="t-footer">
        <div class="content">
            {# {% include "core/footer.tpl" %} #}
        </div>
    </footer>
</main>
{% endblock %}

{% block javascript %}
    console.log( "structure" );
{% endblock %}