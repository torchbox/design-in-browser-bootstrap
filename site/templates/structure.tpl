<header class="page-header">
    <div class="content">
        {% include "organisms/header.tpl" %}
    </div>
</header>
<main>
    <div class="page-notifications">
        <div class="content">
            {# {% include "core/notifications.tpl" %} #}
        </div>
    </div>
    <nav class="page-navigation">
        <div class="content">
            {# {% include "core/navigation.tpl" %} #}
        </div>
    </nav>
    <div class="page-content">
        <div class="content">
            {% block content %}{% endblock %}
        </div>
    </div>
    <footer class="page-footer">
        <div class="content">
            {# {% include "core/footer.tpl" %} #}
        </div>
    </footer>
</main>

{% block javascript %}
    console.log( "structure" );
{% endblock %}